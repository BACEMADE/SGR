import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Why Sufra", href: "/#benefits" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "#login" },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="font-serif text-2xl text-foreground tracking-tight">
          Sufra<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link key={l.href} to={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => handleNavClick(l.href)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            )
          )}
          <Button variant="default" size="sm" className="rounded-full px-6">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-4">
          {links.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => handleNavClick(l.href)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            )
          )}
          <Button variant="default" size="sm" className="rounded-full px-6 w-full">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
