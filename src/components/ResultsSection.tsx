const stats = [
  { value: "3.2x", label: "Average ROI", sub: "for partner restaurants" },
  { value: "200+", label: "Restaurants", sub: "across Saudi Arabia" },
  { value: "500+", label: "Vetted Creators", sub: "in our network" },
  { value: "12M+", label: "Monthly Reach", sub: "across social platforms" },
];

const ResultsSection = () => {
  return (
    <section id="results" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Proven Results</p>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight text-foreground">
            Numbers that speak louder than promises
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl md:text-5xl font-serif text-primary mb-2">{s.value}</p>
              <p className="font-semibold text-foreground">{s.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
