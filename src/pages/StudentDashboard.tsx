import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, CalendarDays, Clock, Search } from "lucide-react";
import { AppNav } from "@/components/app/AppNav";
import { CourseCard } from "@/components/app/CourseCard";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ALL_COURSES, MY_ENROLLED_IDS, ACTIVITY, findCourse } from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const studentNav = [
  { to: "/dashboard", label: "Home" },
  { to: "/my-courses", label: "My Courses" },
  { to: "/profile", label: "Profile" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Dashboard · Skill Share Circle";
    if (!user) navigate("/login");
    else if (user.role !== "student") navigate("/role");
  }, [navigate, user]);

  const enrolled = useMemo(
    () => MY_ENROLLED_IDS.map(findCourse).filter(Boolean) as typeof ALL_COURSES,
    []
  );
  const maxDaily = Math.max(...ACTIVITY.daily.map((d) => d.hours));

  const q = query.trim().toLowerCase();
  const matches = (text: string) => text.toLowerCase().includes(q);
  const filteredEnrolled = q
    ? enrolled.filter(
        (c) => matches(c.title) || matches(c.instructor) || matches(c.category)
      )
    : enrolled;
  const filteredAvailable = q
    ? ALL_COURSES.filter(
        (c) => matches(c.title) || matches(c.instructor) || matches(c.category)
      )
    : ALL_COURSES;

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={studentNav} />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10 space-y-12">
        {/* Greeting */}
        <section className="animate-fade-up">
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">
            {user?.name || "Learner"} 👋
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Pick up where you left off, or explore something new today.
          </p>

          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, instructors, or categories…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-card shadow-card"
            />
          </div>
        </section>

        {/* Activity */}
        <section>
          <h2 className="text-xl font-bold mb-4">Your activity</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={Clock} label="Today" value={`${ACTIVITY.todayHours}h`} accent="primary" />
            <StatCard icon={CalendarDays} label="This week" value={`${ACTIVITY.weekHours}h`} accent="accent" />
            <StatCard icon={Flame} label="This month" value={`${ACTIVITY.monthHours}h`} accent="success" />
          </div>

          <div className="mt-5 bg-card rounded-2xl border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold">Daily study (hours)</h3>
              <span className="text-xs text-muted-foreground">Last 7 days</span>
            </div>
            <div className="flex items-end gap-3 h-40">
              {ACTIVITY.daily.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-secondary rounded-md flex items-end h-32 overflow-hidden">
                    <div
                      className="w-full bg-gradient-blue rounded-md transition-all duration-700"
                      style={{ height: `${(d.hours / maxDaily) * 100}%` }}
                      title={`${d.hours}h`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{d.label}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Weekly goal</span>
                  <span className="text-muted-foreground">{ACTIVITY.weekHours} / 14h</span>
                </div>
                <Progress value={(ACTIVITY.weekHours / 14) * 100} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Monthly goal</span>
                  <span className="text-muted-foreground">{ACTIVITY.monthHours} / 60h</span>
                </div>
                <Progress value={(ACTIVITY.monthHours / 60) * 100} />
              </div>
            </div>
          </div>
        </section>

        {/* My Courses */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold">My Courses</h2>
            <span className="text-sm text-muted-foreground">{filteredEnrolled.length} of {enrolled.length}</span>
          </div>
          {filteredEnrolled.length === 0 ? (
            <p className="text-muted-foreground">
              {q ? "No enrolled courses match your search." : "You haven't enrolled in anything yet."}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEnrolled.map((c) => (
                <CourseCard key={c.id} course={c} ctaLabel="Continue" />
              ))}
            </div>
          )}
        </section>

        {/* Available Courses */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold">Available Courses</h2>
            <span className="text-sm text-muted-foreground">
              {q ? `${filteredAvailable.length} match` : "All free, forever"}
            </span>
          </div>
          {filteredAvailable.length === 0 ? (
            <p className="text-muted-foreground">No courses match "{query}".</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAvailable.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent: "primary" | "accent" | "success";
}) {
  const bg =
    accent === "primary"
      ? "bg-primary-soft text-primary"
      : accent === "accent"
      ? "bg-secondary text-accent"
      : "text-primary-foreground";
  const style = accent === "success" ? { background: "hsl(var(--success))" } : undefined;
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 flex items-center gap-4 card-hover">
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`} style={style}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}
