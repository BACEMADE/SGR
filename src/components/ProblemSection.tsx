import { AlertTriangle, Clock, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Generic Ads Don't Convert",
    description: "Traditional advertising feels disconnected. Diners trust real voices, not polished campaigns that look like everyone else's.",
  },
  {
    icon: Clock,
    title: "Finding Creators Is Exhausting",
    description: "Hours spent searching, negotiating, and chasing unreliable influencers — with no guarantee of quality or follow-through.",
  },
  {
    icon: TrendingDown,
    title: "No Measurable ROI",
    description: "You spend money on marketing but can't trace which efforts actually brought guests through the door.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 md:py-32 bg-espresso text-espresso-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">The Challenge</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            Restaurant marketing in Saudi Arabia is broken
          </h2>
          <p className="text-lg text-espresso-foreground/70 max-w-xl mx-auto">
            Most restaurants waste budget on tactics that don't resonate with today's Saudi diners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <div
              key={i}
              className="bg-espresso-foreground/5 border border-espresso-foreground/10 rounded-2xl p-8 space-y-4 hover:bg-espresso-foreground/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif">{p.title}</h3>
              <p className="text-espresso-foreground/60 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
