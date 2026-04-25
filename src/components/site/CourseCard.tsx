import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import type { Course } from "@/lib/courses";

export const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Link
      to={`/course/${course.slug}`}
      className="group block rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-card transition-all duration-500 border border-border/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={course.cover}
          alt={course.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
          {course.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl leading-snug text-balance group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">with {course.instructor}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-muted-foreground">({course.reviews.toLocaleString()})</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {course.hours}h
          </span>
        </div>
      </div>
    </Link>
  );
};
