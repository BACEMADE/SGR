import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, ExternalLink } from "lucide-react";
import { visits } from "@/data/mockPartnerData";

const platformColor: Record<string, string> = {
  Instagram: "bg-pink-100 text-pink-800 border-pink-200",
  TikTok: "bg-slate-100 text-slate-800 border-slate-200",
};

const Content = () => {
  const visitsWithContent = visits.filter((v) => v.content && v.content.length > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-serif text-foreground">Content</h1>

      {visitsWithContent.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No content delivered yet.
          </CardContent>
        </Card>
      ) : (
        visitsWithContent.map((visit) => (
          <Card key={visit.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-sans font-medium">{visit.creatorName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {visit.creatorHandle} · Visit on {new Date(visit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 w-fit">
                  Completed
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content items */}
              <div className="space-y-2">
                {visit.content!.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-border gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-xs ${platformColor[item.platform]}`}>
                        {item.platform}
                      </Badge>
                      <span className="text-sm text-foreground">{item.type}</span>
                      <span className="text-xs text-muted-foreground">
                        Posted {new Date(item.postingDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Post
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Download className="h-3.5 w-3.5 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes for next visit */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Notes for Next Visit
                </p>
                <Textarea
                  placeholder="Add notes for the next creator visit..."
                  className="min-h-[60px] text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Content;
