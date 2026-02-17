import { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle submission
    console.log("Form submitted", form);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center mb-16">
          <span className="text-primary font-medium tracking-widest text-sm uppercase">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mt-4">
            We'd love to <span className="text-primary italic">hear from you.</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Have questions about our service? Want to learn more about how we can help grow your restaurant? Send us a message.
          </p>
        </div>

        <div className="container mx-auto max-w-5xl grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 border border-border rounded-2xl p-8 bg-card">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-foreground" />
              <h2 className="font-serif text-xl text-foreground font-bold">Send us a message</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-8">
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Name</label>
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  maxLength={100}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={255}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Message</label>
                <Textarea
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  maxLength={1000}
                  className="rounded-lg min-h-[140px]"
                />
              </div>
              <Button type="submit" className="w-full rounded-full text-base py-5">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border rounded-2xl p-8 bg-card">
              <h3 className="font-serif text-lg font-bold text-foreground mb-6">Other ways to reach us</h3>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hello@sufra.sa" },
                  { icon: MapPin, label: "Location", value: "Riyadh, Saudi Arabia" },
                  { icon: Clock, label: "Response Time", value: "Within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-secondary/20">
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Join 50+ Saudi restaurants already growing with Sufra.
              </p>
              <Button className="rounded-full px-6">Start Growing Today</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
