import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

type Role = null | "partner" | "creator";

const Login = () => {
  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error, role: userRole } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast.error(error);
      return;
    }

    if (userRole === "partner") {
      navigate("/partner/dashboard");
    } else {
      navigate("/creator/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center pt-20 pb-8 px-3 md:px-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 md:p-10 space-y-6">
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-serif text-accent">Sufra</h2>
            </Link>
            <h1 className="text-2xl md:text-3xl font-serif text-foreground">
              {role ? "Welcome Back" : "Choose Your Portal"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {role
                ? `Log in as a ${role === "partner" ? "Restaurant Partner" : "Creator"}`
                : "Select how you'd like to log in"}
            </p>
          </div>

          {!role ? (
            <div className="space-y-4">
              <button
                onClick={() => setRole("partner")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-background hover:border-accent hover:bg-accent/5 transition-colors text-left"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent shrink-0">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Restaurant Partner</p>
                  <p className="text-sm text-muted-foreground">Manage creators, visits & content</p>
                </div>
              </button>

              <button
                onClick={() => setRole("creator")}
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-background hover:border-accent hover:bg-accent/5 transition-colors text-left"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent shrink-0">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Creator</p>
                  <p className="text-sm text-muted-foreground">Submit content, track visits & earnings</p>
                </div>
              </button>

              <p className="text-center text-sm text-muted-foreground pt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-accent hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full rounded-full text-base bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? "Logging in…" : "Log In"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => setRole(null)}
                    className="text-accent hover:underline font-medium"
                  >
                    ← Choose a different portal
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
