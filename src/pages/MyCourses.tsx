import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppNav } from "@/components/app/AppNav";
import { CourseCard } from "@/components/app/CourseCard";
import { ALL_COURSES, MY_ENROLLED_IDS, findCourse } from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const studentNav = [
  { to: "/dashboard", label: "Home" },
  { to: "/my-courses", label: "My Courses" },
  { to: "/profile", label: "Profile" },
];

export default function MyCourses() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    document.title = "My Courses · Skill Share Circle";
    if (!user || user.role !== "student") navigate("/login");
  }, [navigate, user]);

  const enrolled = useMemo(
    () => MY_ENROLLED_IDS.map(findCourse).filter(Boolean) as typeof ALL_COURSES,
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={studentNav} />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <header className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold">My Courses</h1>
          <p className="text-muted-foreground mt-2">
            The courses you've enrolled in. Keep going — small steps add up.
          </p>
        </header>

        {enrolled.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-10 text-center shadow-card">
            <p className="text-muted-foreground mb-4">No courses yet.</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm h-10 px-5 hover:bg-primary/90 transition-colors"
            >
              Browse courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map((c) => (
              <CourseCard key={c.id} course={c} ctaLabel="Continue" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
