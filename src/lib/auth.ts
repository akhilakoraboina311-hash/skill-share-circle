// Frontend-only "auth" using localStorage. No real backend.
export type Role = "student" | "professor";

export type MockUser = {
  name: string;
  email: string;
  role: Role | null;
};

const KEY = "ssc_user";

export function getUser(): MockUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: MockUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function setRole(role: Role) {
  const u = getUser();
  if (u) setUser({ ...u, role });
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function nameFromEmail(email: string) {
  const local = email.split("@")[0] || "Learner";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}
