import { Link, NavLink, useNavigate } from "react-router-dom";
import { GraduationCap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout, getUser } from "@/lib/auth";

type Item = { to: string; label: string };

export function AppNav({ items }: { items: Item[] }) {
  const navigate = useNavigate();
  const user = getUser();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-blue text-primary-foreground shadow-glow group-hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-bold text-lg tracking-tight">
            Skill Share <span className="text-primary">Circle</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {user?.role && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-primary-soft text-primary text-xs font-semibold px-3 py-1 capitalize">
              {user.role}
            </span>
          )}
          <Button variant="ghost" size="sm" onClick={onLogout} className="gap-1.5">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-border bg-card">
        <ul className="container mx-auto flex items-center gap-1 overflow-x-auto px-4 py-2">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-primary-soft text-primary"
                      : "text-foreground/70 hover:bg-secondary"
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
