import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { courses } from "@/lib/courses";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Trophy, Flame } from "lucide-react";

const enrolled = [
  { course: courses[0], progress: 62 },
  { course: courses[2], progress: 28 },
  { course: courses[4], progress: 84 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="container mx-auto px-6 py-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back, Iris</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 text-balance">Pick up where you left off.</h1>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { icon: Flame, label: "Day streak", value: "12" },
              { icon: Trophy, label: "Lessons done", value: "47" },
              { icon: PlayCircle, label: "In progress", value: "3" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-2xl border border-border p-5 shadow-soft flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-2xl">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display text-3xl mb-8">Continue learning</h2>
        <div className="space-y-4">
          {enrolled.map(({ course, progress }) => (
            <Link
              key={course.slug}
              to={`/course/${course.slug}`}
              className="group flex flex-col sm:flex-row gap-5 items-stretch bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all"
            >
              <div className="sm:w-56 aspect-video sm:aspect-auto shrink-0 overflow-hidden">
                <img src={course.cover} alt={course.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{course.category}</span>
                <h3 className="font-display text-2xl mt-1 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">with {course.instructor}</p>
                <div className="mt-4 flex items-center gap-4">
                  <Progress value={progress} className="h-1.5 flex-1" />
                  <span className="text-sm font-medium tabular-nums w-12 text-right">{progress}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-3xl mt-20 mb-8">Recommended for you</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(3, 6).map((c) => (
            <Link key={c.slug} to={`/course/${c.slug}`} className="group block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-display text-xl mt-3 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-sm text-muted-foreground">with {c.instructor}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
