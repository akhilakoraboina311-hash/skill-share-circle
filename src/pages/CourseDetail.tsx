import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Users, CheckCircle2 } from "lucide-react";
import { AppNav } from "@/components/app/AppNav";
import { Button } from "@/components/ui/button";
import { findCourse, MY_ENROLLED_IDS } from "@/lib/mockData";
import { getUser } from "@/lib/auth";
import { toast } from "sonner";

export default function CourseDetail() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const course = findCourse(id);

  const isStudent = user?.role === "student";
  const navItems = isStudent
    ? [
        { to: "/dashboard", label: "Home" },
        { to: "/my-courses", label: "My Courses" },
        { to: "/profile", label: "Profile" },
      ]
    : [
        { to: "/professor", label: "Home" },
        { to: "/upload", label: "Upload Content" },
        { to: "/professor/courses", label: "My Courses" },
        { to: "/profile", label: "Profile" },
      ];

  useEffect(() => {
    document.title = course ? `${course.title} · Skill Share Circle` : "Course · Skill Share Circle";
    if (!user) navigate("/login");
  }, [navigate, user, course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <AppNav items={navItems} />
        <main className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link to="/dashboard" className="text-primary underline mt-4 inline-block">
            Back to dashboard
          </Link>
        </main>
      </div>
    );
  }

  const enrolled = MY_ENROLLED_IDS.includes(course.id);

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={navItems} />

      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <article className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-primary-soft text-primary text-xs font-semibold px-3 py-1">
              {course.category}
            </span>
            <span className="rounded-full text-primary-foreground text-xs font-bold uppercase tracking-wide px-3 py-1" style={{ background: "hsl(var(--success))" }}>
              Free
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-balance">{course.title}</h1>
          <p className="text-muted-foreground mt-2">
            Taught by <span className="font-semibold text-foreground">{course.instructor}</span>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {course.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {course.enrolled.toLocaleString()} enrolled
            </span>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden bg-card shadow-card border border-border">
            <div className="aspect-video bg-muted">
              <iframe
                src={course.videoUrl}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-3">About this course</h2>
              <p className="text-foreground/80 leading-relaxed">{course.description}</p>

              <h3 className="text-lg font-bold mt-8 mb-3">What you'll get</h3>
              <ul className="space-y-2">
                {[
                  "Beginner-friendly, step-by-step lessons",
                  "Real exercises you can practice today",
                  "Full lifetime access — always free",
                  "Community support from peers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="md:sticky md:top-24 self-start">
              <div className="bg-card border border-border rounded-2xl shadow-card p-6">
                <p className="text-3xl font-bold text-primary">Free</p>
                <p className="text-xs text-muted-foreground mt-1">No payment required</p>
                <Button
                  className="w-full h-11 mt-5 font-semibold shadow-glow hover:shadow-hover transition-shadow"
                  onClick={() =>
                    enrolled
                      ? toast.info("You're already enrolled")
                      : toast.success(`Enrolled in ${course.title}!`)
                  }
                >
                  {enrolled ? "✓ Enrolled" : "Enroll (Free)"}
                </Button>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Frontend demo — no real enrollment
                </p>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </div>
  );
}
