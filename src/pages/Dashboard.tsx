import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Sparkles, TrendingUp, Calendar, FileText, Loader2 } from "lucide-react";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";

interface GenerationData {
  id: string;
  content_type: string;
  created_at: string;
}

interface DailyCount {
  date: string;
  count: number;
}

interface TypeCount {
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(24, 100%, 60%)",
  "hsl(200, 80%, 55%)",
  "hsl(280, 70%, 60%)",
  "hsl(160, 60%, 50%)",
];

const contentTypeLabels: Record<string, string> = {
  headline: "Headline",
  description: "Description",
  tagline: "Tagline",
  bio: "Bio",
  cta: "CTA Button",
  testimonial: "Testimonial",
  features: "Feature List",
  valueProposition: "Value Prop",
  socialProof: "Social Proof",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<GenerationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGenerations();
    }
  }, [user]);

  const loadGenerations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("content_generations")
        .select("id, content_type, created_at")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setGenerations(data || []);
    } catch (error) {
      console.error("Failed to load generations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats
  const totalGenerations = generations.length;
  const uniqueTypes = new Set(generations.map((g) => g.content_type)).size;
  
  // Get generations in last 7 days
  const last7Days = generations.filter((g) => {
    const date = new Date(g.created_at);
    return date >= subDays(new Date(), 7);
  }).length;

  // Get most used type
  const typeCounts = generations.reduce((acc, g) => {
    acc[g.content_type] = (acc[g.content_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostUsedType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // Prepare daily usage data (last 14 days)
  const dailyData: DailyCount[] = eachDayOfInterval({
    start: subDays(new Date(), 13),
    end: new Date(),
  }).map((date) => {
    const dayStart = startOfDay(date);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const count = generations.filter((g) => {
      const gDate = new Date(g.created_at);
      return gDate >= dayStart && gDate < dayEnd;
    }).length;

    return {
      date: format(date, "MMM d"),
      count,
    };
  });

  // Prepare type distribution data
  const typeData: TypeCount[] = Object.entries(typeCounts)
    .map(([type, count], index) => ({
      name: contentTypeLabels[type] || type,
      value: count,
      color: COLORS[index % COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Analytics</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-2">
            Usage <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Track your content generation statistics and usage patterns.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Generations
              </CardTitle>
              <Sparkles className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalGenerations}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Last 7 Days
              </CardTitle>
              <Calendar className="w-5 h-5 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{last7Days}</div>
              <p className="text-xs text-muted-foreground mt-1">Recent activity</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Content Types Used
              </CardTitle>
              <FileText className="w-5 h-5 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{uniqueTypes}</div>
              <p className="text-xs text-muted-foreground mt-1">Different types</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Most Used
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-foreground truncate">
                {contentTypeLabels[mostUsedType] || mostUsedType}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Favorite type</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Usage Chart */}
          <Card className="glass-card border-border/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Daily Usage (Last 14 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              {totalGenerations === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No data yet. Start generating content!
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                      name="Generations"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Content Type Distribution */}
          <Card className="glass-card border-border/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Content Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {totalGenerations === 0 ? (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No data yet. Start generating content!
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="60%" height={300}>
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {typeData.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-foreground truncate flex-1">
                          {item.name}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                    {typeData.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        +{typeData.length - 5} more types
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bar Chart - Weekly Breakdown */}
          <Card className="glass-card border-border/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Generation Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {totalGenerations === 0 ? (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No data yet. Start generating content!
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="url(#colorGradient)" 
                      radius={[4, 4, 0, 0]}
                      name="Generations"
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                        <stop offset="100%" stopColor="hsl(24, 100%, 60%)" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
