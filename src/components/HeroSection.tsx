import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Saudi restaurant food content creation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/70 to-espresso/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-primary-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Trusted by 200+ restaurants across Saudi Arabia
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-espresso-foreground">
            Real creators.{" "}
            <span className="text-primary italic">Real results.</span>
            <br />
            For your restaurant.
          </h1>

          <p className="text-lg md:text-xl text-espresso-foreground/80 max-w-lg leading-relaxed font-light">
            We connect your restaurant with vetted Saudi food creators who deliver
            authentic content that drives real foot traffic — month after month.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 text-base gap-2 group">
              Start Growing Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 text-base border-espresso-foreground/30 text-espresso-foreground hover:bg-espresso-foreground/10">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
