import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, MessageCircle, Share2, Star, Download, Lightbulb } from "lucide-react";
import { performanceData, quickStats } from "@/data/mockPartnerData";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const Performance = () => {
  const kpis = [
    { label: "Total Views", value: quickStats.views.toLocaleString(), icon: Eye },
    { label: "Likes", value: quickStats.likes.toLocaleString(), icon: Heart },
    { label: "Comments", value: quickStats.comments.toLocaleString(), icon: MessageCircle },
    { label: "Shares", value: quickStats.shares.toLocaleString(), icon: Share2 },
    { label: "Google Reviews", value: performanceData.googleReviews.toString(), icon: Star },
    { label: "Yelp Reviews", value: performanceData.yelpReviews.toString(), icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-serif text-foreground">Performance</h1>
        <Button size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="h-4 w-4 mr-1" /> Download Monthly Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <k.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-xl font-semibold text-foreground">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">Views Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ views: { label: "Views", color: "hsl(var(--accent))" } }} className="h-[250px]">
              <LineChart data={performanceData.viewsOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                likes: { label: "Likes", color: "hsl(var(--accent))" },
                comments: { label: "Comments", color: "hsl(var(--secondary))" },
                shares: { label: "Shares", color: "hsl(var(--primary))" },
              }}
              className="h-[250px]"
            >
              <BarChart data={performanceData.engagementOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="likes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shares" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Breakdowns */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">By Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {performanceData.byPlatform.map((p) => (
              <div key={p.platform} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{p.platform}</span>
                <span className="text-muted-foreground">{p.views.toLocaleString()} views</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">By Creator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {performanceData.byCreator.map((c) => (
              <div key={c.creator} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{c.creator}</span>
                <span className="text-muted-foreground">{c.views.toLocaleString()} views</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-sans font-medium">By Content Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {performanceData.byContentType.map((c) => (
              <div key={c.type} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{c.type}</span>
                <span className="text-muted-foreground">{c.views.toLocaleString()} views</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-sans font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent" /> Monthly Summary & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {performanceData.monthlySummary.map((s, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-accent font-bold mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Performance;
