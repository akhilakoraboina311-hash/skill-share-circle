import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser, nameFromEmail, getUser } from "@/lib/auth";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Sign in · Skill Share Circle";
    const u = getUser();
    if (u?.role) navigate(u.role === "student" ? "/dashboard" : "/professor");
    else if (u) navigate("/role");
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setUser({ name: nameFromEmail(email), email, role: null });
    toast.success(mode === "login" ? "Welcome back!" : "Account created!");
    navigate("/role");
  };

  const google = () => {
    setUser({ name: "Google User", email: "user@gmail.com", role: null });
    toast.success("Signed in with Google");
    navigate("/role");
  };

  return (
    <main className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 animate-fade-up">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-blue text-primary-foreground shadow-glow mb-4">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold">
            Skill Share <span className="text-primary">Circle</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Learn from peers. Teach what you love. Always free.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-6 sm:p-8 animate-fade-up">
          <div className="flex bg-secondary rounded-lg p-1 mb-6">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all capitalize ${
                  mode === m
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-semibold shadow-glow hover:shadow-hover transition-shadow">
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-11 font-semibold gap-2 hover:bg-secondary"
            onClick={google}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.05-3.72 1.05-2.86 0-5.28-1.93-6.15-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23Z"/>
              <path fill="#FBBC05" d="M5.85 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.35-2.1V7.07H2.18a11 11 0 0 0 0 9.86l3.67-2.83Z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.67 2.83C6.72 7.31 9.14 5.38 12 5.38Z"/>
            </svg>
            Continue with Google
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Frontend demo — no real authentication
        </p>
      </div>
    </main>
  );
}
