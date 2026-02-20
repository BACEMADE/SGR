import { Link } from "react-router-dom";
import { CalendarDays, Eye, Heart, MessageCircle, Share2, CheckCircle2, Circle, Clock, FileText, Film, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { visits, quickStats, monthlyPlan, recentActivity } from "@/data/mockPartnerData";

const statusColor: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Completed: "bg-blue-100 text-blue-800 border-blue-200",
  Rescheduled: "bg-purple-100 text-purple-800 border-purple-200",
};

const activityIcon = { visit: CalendarDays, content: Film, report: FileText };

const Dashboard = () => {
  const nextVisit = visits.find((v) => v.status === "Confirmed" || v.status === "Pending");
  const stats = [
    { label: "Views", value: quickStats.views.toLocaleString(), icon: Eye },
    { label: "Likes", value: quickStats.likes.toLocaleString(), icon: Heart },
    { label: "Comments", value: quickStats.comments.toLocaleString(), icon: MessageCircle },
    { label: "Shares", value: quickStats.shares.toLocaleString(), icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-serif text-foreground">Dashboard</h1>
        <div className="flex gap-2">
          <Link to="/partner/calendar">
            <Button size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <CalendarPlus className="h-4 w-4 mr-1" /> Schedule Visit
            </Button>
          </Link>
          <Link to="/partner/performance">
            <Button size="sm" variant="outline" className="rounded-full">
              <FileText className="h-4 w-4 mr-1" /> View Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Next Visit */}
      {nextVisit && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">Next Scheduled Visit</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 space-y-1">
              <p className="font-medium text-foreground">{nextVisit.creatorName}</p>
              <p className="text-sm text-muted-foreground">{nextVisit.creatorHandle}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {new Date(nextVisit.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {nextVisit.time}
              </p>
            </div>
            <Badge variant="outline" className={statusColor[nextVisit.status]}>{nextVisit.status}</Badge>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-xl font-semibold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly Plan */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">This Month's Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {monthlyPlan.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground/40" />
                )}
                <span className={item.completed ? "text-muted-foreground line-through" : "text-foreground"}>
                  {item.task}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a) => {
              const Icon = activityIcon[a.type];
              return (
                <div key={a.id} className="flex items-start gap-3 text-sm">
                  <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
