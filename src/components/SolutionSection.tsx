import { CheckCircle2 } from "lucide-react";
import solutionImage from "@/assets/solution-image.jpg";

const steps = [
  {
    title: "Vetted Local Creators",
    description: "We handpick Saudi food creators who understand your cuisine, your city, and your audience.",
  },
  {
    title: "Recurring Content Campaigns",
    description: "No more one-off posts. Get a steady stream of authentic, high-quality content every month.",
  },
  {
    title: "Full Campaign Management",
    description: "We handle matching, scheduling, content review, and performance tracking — so you don't have to.",
  },
  {
    title: "Real Foot Traffic, Tracked",
    description: "See exactly how many visits and engagements each creator drives to your restaurant.",
  },
];

const SolutionSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-foreground">
            Your dedicated restaurant growth engine
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={solutionImage} alt="Saudi food spread" className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent" />
          </div>

          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
