import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Plus, Check } from "lucide-react";
import { creatorVisits, contentSubmissions, ContentSubmission } from "@/data/mockCreatorData";
import { useToast } from "@/hooks/use-toast";

const submissionStatusColor: Record<string, string> = {
  Submitted: "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  "Needs Revision": "bg-orange-100 text-orange-800",
};

const CreatorSubmitContent = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContentSubmission[]>(contentSubmissions);
  const [expandedVisit, setExpandedVisit] = useState<string | null>(null);
  const [formData, setFormData] = useState({ platform: "" as "" | "Instagram" | "TikTok", postUrl: "", notes: "" });

  const completedVisits = creatorVisits.filter((v) => v.status === "Completed");

  const handleSubmit = (visitId: string) => {
    if (!formData.platform || !formData.postUrl) {
      toast({ title: "Missing fields", description: "Please select a platform and enter a post URL.", variant: "destructive" });
      return;
    }

    const newSubmission: ContentSubmission = {
      id: `cs-${Date.now()}`,
      visitId,
      platform: formData.platform as "Instagram" | "TikTok",
      postUrl: formData.postUrl,
      notes: formData.notes,
      status: "Submitted",
      submittedAt: new Date().toISOString().split("T")[0],
    };

    setSubmissions((prev) => [...prev, newSubmission]);
    setFormData({ platform: "", postUrl: "", notes: "" });
    toast({ title: "Content submitted!", description: "Your post has been submitted for review." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-foreground">Submit Content</h1>
        <p className="text-sm text-muted-foreground mt-1">Submit your post links for completed visits.</p>
      </div>

      {completedVisits.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">No completed visits yet. Content submission opens after a visit is marked complete.</CardContent>
        </Card>
      ) : (
        completedVisits.map((visit) => {
          const visitSubs = submissions.filter((s) => s.visitId === visit.id);
          const isExpanded = expandedVisit === visit.id;

          return (
            <Card key={visit.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{visit.restaurantName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(visit.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} — {visit.deliverables.join(", ")}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedVisit(isExpanded ? null : visit.id)}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    {isExpanded ? "Cancel" : "Add Submission"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Submission form */}
                {isExpanded && (
                  <div className="border border-border rounded-lg p-4 space-y-3 bg-muted/30">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Platform</Label>
                        <Select value={formData.platform} onValueChange={(v) => setFormData((f) => ({ ...f, platform: v as "Instagram" | "TikTok" }))}>
                          <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="TikTok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs">Post URL</Label>
                        <Input
                          placeholder="https://instagram.com/p/..."
                          value={formData.postUrl}
                          onChange={(e) => setFormData((f) => ({ ...f, postUrl: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Notes (optional)</Label>
                      <Textarea
                        placeholder="Any notes about this post..."
                        value={formData.notes}
                        onChange={(e) => setFormData((f) => ({ ...f, notes: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <Button size="sm" onClick={() => handleSubmit(visit.id)}>
                      <Check className="h-3.5 w-3.5 mr-1" /> Submit
                    </Button>
                  </div>
                )}

                {/* Submission history */}
                {visitSubs.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Submitted Posts</p>
                    {visitSubs.map((sub) => (
                      <div key={sub.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-md border border-border bg-background">
                        <div className="flex items-center gap-2 min-w-0">
                          <Badge variant="outline" className="text-xs shrink-0">{sub.platform}</Badge>
                          <a
                            href={sub.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-accent hover:underline truncate flex items-center gap-1"
                          >
                            {sub.postUrl} <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{sub.submittedAt}</span>
                          <Badge className={submissionStatusColor[sub.status]}>{sub.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No posts submitted yet for this visit.</p>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default CreatorSubmitContent;
