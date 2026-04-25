import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, Shield } from "lucide-react";
import { AppNav } from "@/components/app/AppNav";
import { getUser } from "@/lib/auth";

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    document.title = "Profile · Skill Share Circle";
    if (!user) navigate("/login");
  }, [navigate, user]);

  if (!user) return null;

  const isStudent = user.role === "student";
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

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={navItems} />
      <main className="container mx-auto px-4 md:px-6 py-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-up">My Profile</h1>

        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden animate-fade-up">
          <div className="bg-gradient-blue h-32" />
          <div className="px-6 sm:px-8 pb-8 -mt-12">
            <div className="h-24 w-24 rounded-2xl bg-card border-4 border-card shadow-card flex items-center justify-center text-3xl font-bold text-primary">
              {initials}
            </div>
            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
            <p className="text-muted-foreground capitalize text-sm">{user.role}</p>

            <div className="mt-6 space-y-3">
              <ProfileRow icon={User} label="Name" value={user.name} />
              <ProfileRow icon={Mail} label="Email" value={user.email} />
              <ProfileRow
                icon={Shield}
                label="Role"
                value={user.role ? user.role[0].toUpperCase() + user.role.slice(1) : "—"}
              />
            </div>

            <div className="mt-8 p-4 rounded-xl bg-primary-soft text-sm text-primary">
              💡 This is a frontend-only demo. Profile data is stored locally in your browser.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/60">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-card text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
