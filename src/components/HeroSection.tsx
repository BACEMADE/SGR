import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-[85vh] md:min-h-[90vh] flex items-center pt-20 bg-background py-6">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div className="space-y-5 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] text-foreground">
              Connecting Saudi Restaurants With Local Food Creators —{" "}
              <span className="text-primary italic">Every Month.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              We match your restaurant with vetted Saudi food creators who visit,
              create authentic content, and keep your brand visible across social
              media — consistently.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 text-base gap-2 group">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full px-8 text-base text-foreground hover:bg-muted w-full sm:w-auto">

                  How It Works
                </Button>
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Saudi food creator capturing restaurant content"
                className="w-full aspect-[4/3] object-cover" />

            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;