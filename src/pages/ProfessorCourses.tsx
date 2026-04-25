import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AppNav } from "@/components/app/AppNav";
import { CourseCard } from "@/components/app/CourseCard";
import { Button } from "@/components/ui/button";
import { ALL_COURSES, PROFESSOR_COURSES, findCourse } from "@/lib/mockData";
import { getUser } from "@/lib/auth";

const professorNav = [
  { to: "/professor", label: "Home" },
  { to: "/upload", label: "Upload Content" },
  { to: "/professor/courses", label: "My Courses" },
  { to: "/profile", label: "Profile" },
];

export default function ProfessorCourses() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    document.title = "My Courses · Skill Share Circle";
    if (!user || user.role !== "professor") navigate("/login");
  }, [navigate, user]);

  const myCourses = useMemo(
    () => PROFESSOR_COURSES.map(findCourse).filter(Boolean) as typeof ALL_COURSES,
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={professorNav} />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-fade-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-2">Manage and grow your published content.</p>
          </div>
          <Button asChild className="font-semibold shadow-glow">
            <Link to="/upload">
              <Plus className="h-4 w-4" />
              New course
            </Link>
          </Button>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((c) => (
            <CourseCard key={c.id} course={c} ctaLabel="Manage" />
          ))}
        </div>
      </main>
    </div>
  );
}
