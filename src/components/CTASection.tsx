import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-espresso text-espresso-foreground">
      <div className="container mx-auto px-6 text-center max-w-2xl space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
          Ready to grow your restaurant with{" "}
          <span className="text-primary italic">real content?</span>
        </h2>
        <p className="text-espresso-foreground/70 text-lg">
          Join 200+ Saudi restaurants already on the platform. No long-term contracts.
        </p>
        <Link to="/signup">
          <Button size="lg" className="rounded-full px-10 text-base gap-2 group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
