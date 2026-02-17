const Footer = () => {
  return (
    <footer className="py-10 border-t border-border bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="font-serif text-xl text-foreground tracking-tight">
          Sufra<span className="text-primary">.</span>
        </a>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 Sufra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
