import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Presentation, ArrowRight } from "lucide-react";
import { getUser, setRole } from "@/lib/auth";
import { toast } from "sonner";

export default function RoleSelect() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Choose your role · Skill Share Circle";
    if (!getUser()) navigate("/login");
  }, [navigate]);

  const choose = (r: "student" | "professor") => {
    setRole(r);
    toast.success(`Continuing as ${r}`);
    navigate(r === "student" ? "/dashboard" : "/professor");
  };

  return (
    <main className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-10 animate-fade-up">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Welcome</p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 text-balance">
            How would you like to begin?
          </h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            You can switch any time. Both experiences are completely free.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              role: "student" as const,
              title: "Continue as Student",
              desc: "Browse free courses, track your daily progress, and learn at your own pace.",
              icon: BookOpen,
            },
            {
              role: "professor" as const,
              title: "Continue as Professor",
              desc: "Share what you know. Upload courses, track engagement, and reach learners.",
              icon: Presentation,
            },
          ].map((opt) => (
            <button
              key={opt.role}
              onClick={() => choose(opt.role)}
              className="group text-left bg-card rounded-2xl border border-border shadow-card card-hover p-7 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary mb-5 group-hover:bg-gradient-blue group-hover:text-primary-foreground transition-colors">
                <opt.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">{opt.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{opt.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                Get started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
