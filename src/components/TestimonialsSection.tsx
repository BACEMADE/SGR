import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Sufra matched us with creators who genuinely loved our food. The content felt real — and our weekday traffic went up 30%.",
    name: "Ahmed Al-Rashidi",
    role: "Owner, Dar Al-Mashawi · Riyadh",
  },
  {
    quote:
      "We used to chase influencers with no structure. Sufra made it effortless and consistent. Now we get fresh content every month without lifting a finger.",
    name: "Noura Al-Harbi",
    role: "Marketing Manager, Café Sélect · Jeddah",
  },
  {
    quote:
      "The ROI is clear. We can see exactly which creators drive visits. It's the most accountable marketing channel we've ever used.",
    name: "Faisal Al-Otaibi",
    role: "Co-founder, The Grill House · Dammam",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-32 bg-card">
      <div className="container mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Restaurants across Saudi trust Sufra
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background border border-border rounded-2xl p-7 space-y-5"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed text-[0.95rem]">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
