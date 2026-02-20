import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "5 Local Creator Visits Per Month",
    description: "Vetted local creators with local audiences",
  },
  {
    title: "High-Quality Video Content",
    description: "Organically posted TikToks & Instagram Reels",
  },
  {
    title: "Google & HungerStation Discoverability",
    description: "Drive more visits to your pages",
  },
  {
    title: "Performance Dashboard",
    description: "Track views, shares, and growth",
  },
  {
    title: "End-to-End Management",
    description: "We handle outreach, booking & delivery",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Simple Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
            One plan. Everything <span className="italic text-accent">included.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            No hidden fees. Just consistent growth.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              {/* Left — Plan & Price */}
              <div className="p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground">
                    Partner Membership
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-serif font-bold text-foreground">
                      $399
                    </span>
                    <span className="text-muted-foreground text-lg">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Cancel your subscription anytime. No contracts.
                  </p>
                </div>
                <Link to="/signup" className="mt-8">
                  <Button
                    size="lg"
                    className="w-full rounded-full text-base bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Start Now
                  </Button>
                </Link>
              </div>

              {/* Right — Features */}
              <div className="p-8 md:p-10">
                <h4 className="font-semibold text-foreground mb-6">What's included:</h4>
                <div className="space-y-5">
                  {features.map((f, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{f.title}</p>
                        <p className="text-xs text-muted-foreground">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
