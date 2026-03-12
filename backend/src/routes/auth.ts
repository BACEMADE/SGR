import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { query } from "../db/pool";
import { authenticate, AuthPayload } from "../middleware/auth";

const router = Router();

const SALT_ROUNDS = 12;

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(1, "Full name is required"),
  role: z.enum(["creator", "partner"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function generateTokens(payload: AuthPayload) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
  const refreshToken = uuidv4();
  return { accessToken, refreshToken };
}

// POST /api/auth/signup
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const { email, password, fullName, role } = parsed.data;

    // Check existing user
    const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password (bcrypt includes salt automatically)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const userResult = await query(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id",
      [email, passwordHash, fullName]
    );
    const userId = userResult.rows[0].id;

    // Assign role
    await query("INSERT INTO user_roles (user_id, role) VALUES ($1, $2)", [userId, role]);

    // Create profile
    await query(
      "INSERT INTO profiles (user_id, email, full_name) VALUES ($1, $2, $3)",
      [userId, email, fullName]
    );

    // Generate tokens
    const tokenPayload: AuthPayload = { userId, email, role };
    const { accessToken, refreshToken } = generateTokens(tokenPayload);

    // Store refresh token
    const refreshHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await query(
      "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
      [userId, refreshHash, expiresAt]
    );

    return res.status(201).json({
      user: { id: userId, email, fullName, role },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const { email, password } = parsed.data;

    // Find user
    const userResult = await query(
      "SELECT u.id, u.email, u.password_hash, u.full_name, ur.role FROM users u JOIN user_roles ur ON u.id = ur.user_id WHERE u.email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];

    // Verify password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate tokens
    const tokenPayload: AuthPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const { accessToken, refreshToken } = generateTokens(tokenPayload);

    // Store refresh token
    const refreshHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await query(
      "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
      [user.id, refreshHash, expiresAt]
    );

    return res.json({
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/auth/me
router.get("/me", authenticate, async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT u.id, u.email, u.full_name, ur.role, p.phone, p.city, p.avatar_url FROM users u JOIN user_roles ur ON u.id = ur.user_id LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = $1",
      [req.user!.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    return res.json({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      phone: user.phone,
      city: user.city,
      avatarUrl: user.avatar_url,
    });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/logout
router.post("/logout", authenticate, async (req: Request, res: Response) => {
  try {
    await query("UPDATE refresh_tokens SET revoked = TRUE WHERE user_id = $1", [
      req.user!.userId,
    ]);
    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
