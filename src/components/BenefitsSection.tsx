import { TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";

const benefits = [
{
  icon: TrendingUp,
  title: "Real Foot Traffic",
  description:
  "Authentic creator content drives real guests to your door — not just impressions."
},
{
  icon: Shield,
  title: "Vetted Creators Only",
  description:
  "Every creator in our network is reviewed and approved. No guesswork, no risk."
},
{
  icon: Zap,
  title: "Zero Effort On Your End",
  description:
  "We handle matching, scheduling, and content review. You focus on your food."
},
{
  icon: BarChart3,
  title: "Measurable Results",
  description:
  "Track visits, content performance, and ROI with clear monthly reporting."
}];


const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Why Sufra
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Built for restaurants that want to grow
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {benefits.map((b, i) =>
          <div
            key={i}
            className="flex gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">

              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default BenefitsSection;