import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, TrendingUp, Globe2, Search } from "lucide-react";
import { AppNav } from "@/components/app/AppNav";
import { CourseCard } from "@/components/app/CourseCard";
import { Input } from "@/components/ui/input";
import {
  ALL_COURSES,
  PROFESSOR_COURSES,
  PROFESSOR_ANALYTICS,
  findCourse,
} from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const professorNav = [
  { to: "/professor", label: "Home" },
  { to: "/upload", label: "Upload Content" },
  { to: "/professor/courses", label: "My Courses" },
  { to: "/profile", label: "Profile" },
];

export default function ProfessorDashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Professor · Skill Share Circle";
    if (!user) navigate("/login");
    else if (user.role !== "professor") navigate("/role");
  }, [navigate, user]);

  const myCourses = useMemo(
    () => PROFESSOR_COURSES.map(findCourse).filter(Boolean) as typeof ALL_COURSES,
    []
  );

  const totals = useMemo(() => {
    return Object.values(PROFESSOR_ANALYTICS).reduce(
      (acc, a) => ({
        views: acc.views + a.views,
        engagement: acc.engagement + a.engagement,
        reach: acc.reach + a.reach,
      }),
      { views: 0, engagement: 0, reach: 0 }
    );
  }, []);
  const avgEngagement = Math.round(totals.engagement / Math.max(myCourses.length, 1));

  const q = query.trim().toLowerCase();
  const matches = (text: string) => text.toLowerCase().includes(q);
  const filteredCourses = q
    ? myCourses.filter(
        (c) => matches(c.title) || matches(c.category) || matches(c.description)
      )
    : myCourses;

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={professorNav} />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10 space-y-12">
        <header className="animate-fade-up">
          <p className="text-sm text-muted-foreground">Hello Professor,</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">{user?.name || "Educator"}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Track how your courses are performing and share new knowledge.
          </p>

          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your courses by title, category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-card shadow-card"
            />
          </div>
        </header>

        {/* Analytics summary */}
        <section>
          <h2 className="text-xl font-bold mb-4">Analytics overview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <AnalyticCard icon={Eye} label="Total Views" value={totals.views.toLocaleString()} />
            <AnalyticCard icon={TrendingUp} label="Avg Engagement" value={`${avgEngagement}%`} />
            <AnalyticCard icon={Globe2} label="Total Reach" value={totals.reach.toLocaleString()} />
          </div>

          <div className="mt-5 bg-card rounded-2xl border border-border shadow-card p-6">
            <h3 className="font-semibold mb-5">Per-course performance</h3>
            <div className="space-y-5">
              {myCourses.map((c) => {
                const a = PROFESSOR_ANALYTICS[c.id as keyof typeof PROFESSOR_ANALYTICS];
                if (!a) return null;
                return (
                  <div key={c.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{c.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {a.views.toLocaleString()} views · {a.reach.toLocaleString()} reach
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-blue transition-all duration-700"
                        style={{ width: `${a.engagement}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Engagement: {a.engagement}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* My Courses */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold">My Courses</h2>
            <span className="text-sm text-muted-foreground">
              {q ? `${filteredCourses.length} of ${myCourses.length}` : `${myCourses.length} published`}
            </span>
          </div>
          {filteredCourses.length === 0 ? (
            <p className="text-muted-foreground">No courses match "{query}".</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((c) => (
                <CourseCard key={c.id} course={c} ctaLabel="Manage" />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function AnalyticCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 flex items-center gap-4 card-hover">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}
