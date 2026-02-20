import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems, supportTickets } from "@/data/mockPartnerData";
import { Send } from "lucide-react";

const Support = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-serif text-foreground">Support</h1>

      {/* Contact Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium">Send us a message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="What do you need help with?" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Describe your question or issue..." className="min-h-[100px]" />
          </div>
          <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Send className="h-4 w-4 mr-1" /> Send Message
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Tickets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium">Your Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
                <p className="text-xs text-muted-foreground">{ticket.id} · {ticket.date}</p>
              </div>
              <Badge
                variant="outline"
                className={ticket.status === "Open"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-muted text-muted-foreground border-border"
                }
              >
                {ticket.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
