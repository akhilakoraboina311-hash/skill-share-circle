import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getCourse } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, PlayCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = slug ? getCourse(slug) : undefined;
  const [enrolled, setEnrolled] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Nav />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-4xl">Course not found</h1>
          <Link to="/courses" className="mt-6 inline-block text-primary hover:underline">Back to courses</Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    setEnrolled(true);
    toast.success(`You're in! Welcome to "${course.title}".`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="bg-gradient-paper border-b border-border/60">
        <div className="container mx-auto px-6 py-12">
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> All courses
          </Link>
          <div className="mt-8 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <span className="text-xs uppercase tracking-[0.2em] text-primary">{course.category}</span>
              <h1 className="font-display text-4xl md:text-6xl mt-3 text-balance leading-[1.05]">{course.title}</h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{course.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <strong>{course.rating}</strong>
                  <span className="text-muted-foreground">({course.reviews.toLocaleString()} reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" /> {course.students.toLocaleString()} learners
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" /> {course.hours}h · {course.lessons} lessons
                </span>
                <span className="px-2.5 py-1 rounded-full bg-secondary text-xs">{course.level}</span>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-primary/15 text-primary flex items-center justify-center font-display">
                  {course.instructor[0]}
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">{course.instructorRole}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card sticky top-24">
                <div className="relative aspect-video bg-muted">
                  <img src={course.cover} alt={course.title} className="h-full w-full object-cover" />
                  <button className="absolute inset-0 grid place-items-center bg-foreground/20 hover:bg-foreground/30 transition-colors">
                    <PlayCircle className="h-16 w-16 text-background drop-shadow-lg" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl">${course.price}</span>
                    <span className="text-sm text-muted-foreground">one-time</span>
                  </div>
                  <Button
                    onClick={handleEnroll}
                    disabled={enrolled}
                    className="w-full mt-5 h-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm"
                  >
                    {enrolled ? "Enrolled — head to dashboard" : "Enroll now"}
                  </Button>
                  <ul className="mt-6 space-y-2.5 text-sm">
                    {["Lifetime access", "Weekly cohort circle", "Peer reviews on your work", "Certificate of completion"].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + curriculum */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <h2 className="font-display text-3xl">About this course</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">{course.about}</p>

          <h2 className="font-display text-3xl mt-14">Curriculum</h2>
          <ol className="mt-6 divide-y divide-border border-y border-border">
            {course.curriculum.map((l, i) => (
              <li key={i} className="flex items-center gap-4 py-4">
                <span className="font-display text-xl text-muted-foreground w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{l.title}</span>
                <span className="text-sm text-muted-foreground">{l.minutes} min</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="md:col-span-5">
          <h2 className="font-display text-3xl">From the cohort</h2>
          <div className="mt-6 space-y-5">
            {course.testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(t.rating)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-3 font-display italic text-lg leading-snug">"{t.text}"</p>
                <p className="mt-3 text-sm text-muted-foreground">— {t.name}, {t.role}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
