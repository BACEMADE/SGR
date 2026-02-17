import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-espresso text-espresso-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight">
            Ready to fill every table with{" "}
            <span className="text-primary italic">authentic reach?</span>
          </h2>
          <p className="text-lg text-espresso-foreground/70 max-w-xl mx-auto">
            Join 200+ Saudi restaurants already growing with Sufra. No contracts, no hassle — just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-10 text-base gap-2 group">
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-10 text-base border-espresso-foreground/30 text-espresso-foreground hover:bg-espresso-foreground/10"
            >
              Book a Demo
            </Button>
          </div>
          <p className="text-sm text-espresso-foreground/50">
            Free 14-day trial · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
