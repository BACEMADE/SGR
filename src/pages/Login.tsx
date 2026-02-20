import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — redirect to partner dashboard
    navigate("/partner/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center pt-20 pb-8 px-3 md:px-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-8 md:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-serif text-accent">Sufra</h2>
            </Link>
            <h1 className="text-2xl md:text-3xl font-serif text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Log in to manage your creator partnerships
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-base bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Log In
            </Button>

            <div className="text-center space-y-2">
              <a href="#" className="text-sm text-accent hover:underline">
                Forgot your password?
              </a>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-accent hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
