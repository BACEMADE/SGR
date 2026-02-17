import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Sufra transformed how we approach marketing. The creators they matched us with understood our brand perfectly — and the results were immediate.",
    name: "Ahmed Al-Rashidi",
    role: "Owner, Dar Al-Mashawi · Riyadh",
  },
  {
    quote: "We tried influencer marketing before and it felt random. With Sufra, everything is structured, professional, and measurable. Our weekend reservations are up 40%.",
    name: "Noura Al-Harbi",
    role: "Marketing Manager, Café Sélect · Jeddah",
  },
  {
    quote: "The quality of content we receive every month is outstanding. Our social media has never looked this authentic. It's like having an in-house creative team.",
    name: "Faisal Al-Otaibi",
    role: "Co-founder, The Grill House · Dammam",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-foreground">
            Trusted by restaurant leaders across the Kingdom
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-8 space-y-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed italic">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
