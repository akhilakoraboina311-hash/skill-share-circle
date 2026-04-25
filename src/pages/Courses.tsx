import { useMemo, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/lib/courses";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = ["All", "Ceramics", "Music", "Cooking", "Painting", "Lettering", "Code"];

const Courses = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCat = cat === "All" || c.category === cat;
      const matchesQ =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [query, cat]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="container mx-auto px-6 py-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The library</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 text-balance max-w-3xl">
            Every course, taught by someone who loves it.
          </h1>
          <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses or instructors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 h-12 bg-card border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    cat === c
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-foreground/80 border-border hover:border-foreground/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-24">No courses match that yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
