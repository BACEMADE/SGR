import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Film, FileText, MessageSquare, ArrowRight } from "lucide-react";
import { creatorVisits, creatorStats, creatorActivity } from "@/data/mockCreatorData";

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Completed: "bg-blue-100 text-blue-800",
};

const activityIcon = {
  visit: CalendarDays,
  content: Film,
  message: MessageSquare,
};

const CreatorDashboard = () => {
  const nextVisit = creatorVisits
    .filter((v) => v.status !== "Completed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const stats = [
    { label: "Visits Completed", value: creatorStats.totalVisitsCompleted },
    { label: "Posts Submitted", value: creatorStats.postsSubmitted },
    { label: "Pending Submissions", value: creatorStats.pendingSubmissions },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Welcome back, Mia</h1>
          <p className="text-muted-foreground text-sm">Here's what's happening with your visits.</p>
        </div>
        <Button asChild>
          <Link to="/creator/visits">
            View Upcoming Visits <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {nextVisit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Next Scheduled Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{nextVisit.restaurantName}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(nextVisit.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {nextVisit.time}
                </p>
                <p className="text-sm text-muted-foreground">{nextVisit.restaurantCity}</p>
              </div>
              <Badge className={statusColor[nextVisit.status]}>{nextVisit.status}</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {creatorActivity.map((item) => {
              const Icon = activityIcon[item.type];
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorDashboard;
