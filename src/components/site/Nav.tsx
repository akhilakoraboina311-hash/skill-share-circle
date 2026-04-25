import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/courses", label: "Courses" },
  { to: "/teach", label: "Teach" },
  { to: "/dashboard", label: "My learning" },
];

export const Nav = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
          <span className="font-display text-xl font-semibold tracking-tight">Kindling</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground/80"}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Join free</Button>
        </div>
      </nav>
    </header>
  );
};
