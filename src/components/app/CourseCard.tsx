import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import type { Course } from "@/lib/mockData";

export function CourseCard({ course, ctaLabel = "View" }: { course: Course; ctaLabel?: string }) {
  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-card card-hover flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-card/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary">
          {course.category}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-success/95 text-primary-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wide" style={{ background: "hsl(var(--success))" }}>
          Free
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg leading-snug text-balance">{course.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">by {course.instructor}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.enrolled.toLocaleString()} enrolled
          </span>
        </div>

        <Link
          to={`/course/${course.id}`}
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-sm h-10 hover:bg-primary/90 transition-colors shadow-sm hover:shadow-glow"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
