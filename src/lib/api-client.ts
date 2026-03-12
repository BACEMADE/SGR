/**
 * API client for the AWS-hosted backend.
 *
 * When migrating away from Supabase/Lovable Cloud, replace imports of
 * `@/integrations/supabase/client` with this module.
 *
 * Set VITE_API_BASE_URL in your .env to point to the backend.
 * In production with CloudFront, this can be "" (same origin) since
 * /api/* is routed to the ALB automatically.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem("sufra_access_token");
    this.refreshToken = localStorage.getItem("sufra_refresh_token");
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem("sufra_access_token", accessToken);
    localStorage.setItem("sufra_refresh_token", refreshToken);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem("sufra_access_token");
    localStorage.removeItem("sufra_refresh_token");
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  async request<T = unknown>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (this.accessToken) {
      reqHeaders["Authorization"] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // ---------- Auth ----------

  async signUp(email: string, password: string, fullName: string, role: "creator" | "partner") {
    const data = await this.request<{
      user: { id: string; email: string; fullName: string; role: string };
      accessToken: string;
      refreshToken: string;
    }>("/api/auth/signup", {
      method: "POST",
      body: { email, password, fullName, role },
    });
    this.setTokens(data.accessToken, data.refreshToken);
    return data;
  }

  async signIn(email: string, password: string) {
    const data = await this.request<{
      user: { id: string; email: string; fullName: string; role: string };
      accessToken: string;
      refreshToken: string;
    }>("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });
    this.setTokens(data.accessToken, data.refreshToken);
    return data;
  }

  async getMe() {
    return this.request<{
      id: string;
      email: string;
      fullName: string;
      role: string;
      phone: string;
      city: string;
      avatarUrl: string | null;
    }>("/api/auth/me");
  }

  async signOut() {
    try {
      await this.request("/api/auth/logout", { method: "POST" });
    } finally {
      this.clearTokens();
    }
  }

  // ---------- Profile ----------

  async getProfile() {
    return this.request("/api/profile");
  }

  async updateProfile(data: { fullName?: string; phone?: string; city?: string; avatarUrl?: string | null }) {
    return this.request("/api/profile", { method: "PATCH", body: data });
  }
}

export const apiClient = new ApiClient();
