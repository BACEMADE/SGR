import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Clock, User, FileText } from "lucide-react";
import { creatorVisits, CreatorAssignedVisit } from "@/data/mockCreatorData";
import { Link } from "react-router-dom";

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Completed: "bg-blue-100 text-blue-800",
};

const CreatorVisits = () => {
  const [selectedVisit, setSelectedVisit] = useState<CreatorAssignedVisit | null>(null);

  const upcoming = creatorVisits
    .filter((v) => v.status !== "Completed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const completed = creatorVisits.filter((v) => v.status === "Completed");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-foreground">Upcoming Visits</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {upcoming.length === 0 && (
            <Card><CardContent className="pt-6 text-center text-muted-foreground">No upcoming visits scheduled.</CardContent></Card>
          )}
          {upcoming.map((visit) => (
            <Card
              key={visit.id}
              className="cursor-pointer hover:border-accent/50 transition-colors"
              onClick={() => setSelectedVisit(visit)}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{visit.restaurantName}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(visit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {visit.time}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {visit.restaurantCity}
                    </div>
                  </div>
                  <Badge className={statusColor[visit.status]}>{visit.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {completed.length > 0 && (
            <>
              <h2 className="text-lg font-medium text-foreground pt-4">Past Visits</h2>
              {completed.map((visit) => (
                <Card
                  key={visit.id}
                  className="cursor-pointer hover:border-accent/50 transition-colors opacity-80"
                  onClick={() => setSelectedVisit(visit)}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{visit.restaurantName}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {new Date(visit.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {visit.time}
                        </div>
                      </div>
                      <Badge className={statusColor[visit.status]}>{visit.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Visit Details Panel */}
        <div className="lg:col-span-1">
          {selectedVisit ? (
            <Card className="sticky top-20">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base">Visit Details</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedVisit(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">{selectedVisit.restaurantName}</p>
                  <p className="text-sm text-muted-foreground">{selectedVisit.restaurantAddress}</p>
                  <p className="text-sm text-muted-foreground">{selectedVisit.restaurantCity}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="text-foreground">{selectedVisit.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-foreground">
                    {new Date(selectedVisit.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedVisit.time}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Required Deliverables</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVisit.deliverables.map((d, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{d}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Instructions</p>
                  <p className="text-sm text-muted-foreground">{selectedVisit.instructions}</p>
                </div>
                {selectedVisit.status === "Completed" && (
                  <Button asChild className="w-full">
                    <Link to="/creator/submit">Submit Content</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground text-sm">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                Select a visit to see details
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorVisits;
