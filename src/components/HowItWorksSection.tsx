import { Users, Camera, TrendingUp, Star, MapPin, AtSign } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
            Focus on the <span className="italic text-primary">food.</span>
            <br />
            We handle the rest.
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-serif text-foreground">
              1. We Match
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We send 5 local creators every single month
              to make reviews of your food.
            </p>
            {/* Illustration */}
            <div className="pt-6 flex justify-center">
              <div className="w-48 h-48 rounded-2xl border-2 border-foreground/10 bg-card flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                <div className="flex flex-col gap-2 items-center relative z-10">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center">
                      <Users className="w-4 h-4 text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-serif text-foreground">
              2. They Create
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All local creators, all local audiences, all
              potential customers.
            </p>
            {/* Phone illustration */}
            <div className="pt-6 flex justify-center">
              <div className="w-36 h-56 rounded-[2rem] border-2 border-foreground/15 bg-card flex flex-col items-center justify-between p-4 relative overflow-hidden">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1 bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive inline-block" />
                    REC
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">4K 60</span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
                  <div className="w-3 h-3 rounded-sm bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-serif text-foreground">
              3. Your Visibility Grows
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built for the local algorithm. Consistent
              visibility, shares, saves, and foot traffic.
            </p>
            {/* Notification cards */}
            <div className="pt-6 flex flex-col items-center gap-3">
              <div className="w-full max-w-[220px] flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">Google</p>
                  <p className="text-[11px] text-muted-foreground">New 5-star review</p>
                </div>
              </div>
              <div className="w-full max-w-[220px] flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">HungerStation</p>
                  <p className="text-[11px] text-muted-foreground">New 5-star review</p>
                </div>
              </div>
              <div className="w-full max-w-[220px] flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                  <AtSign className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-foreground">@nora.eats</p>
                  <p className="text-[11px] text-muted-foreground">Tagged you on TikTok</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
