import { UserCheck, Camera, Repeat } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    step: "01",
    title: "We Match You",
    description:
      "Tell us about your restaurant. We pair you with vetted local food creators who fit your brand and audience.",
  },
  {
    icon: Camera,
    step: "02",
    title: "Creators Visit & Create",
    description:
      "Creators visit your restaurant, experience your food, and produce authentic photos, reels, and reviews.",
  },
  {
    icon: Repeat,
    step: "03",
    title: "Recurring Visibility",
    description:
      "Content goes live across social platforms every month — building trust, reach, and foot traffic over time.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Simple. Structured. Recurring.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Step {s.step}
              </p>
              <h3 className="text-xl font-serif text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
