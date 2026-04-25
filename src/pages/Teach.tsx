import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Teach = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="bg-gradient-paper">
        <div className="container mx-auto px-6 py-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">For instructors</span>
            <h1 className="font-display text-5xl md:text-7xl mt-4 text-balance leading-[1]">
              The best students you'll ever have.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Kindling instructors keep 80% of every enrollment, with cohort tools that
              actually feel like a workshop — not a webinar.
            </p>
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm">
              Apply to teach <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {[
              { k: "80%", v: "Revenue share" },
              { k: "$2.4k", v: "Avg. monthly per cohort" },
              { k: "4.9★", v: "Instructor satisfaction" },
              { k: "0", v: "Setup fees, ever" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
                <div className="font-display text-3xl text-primary">{s.k}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <h2 className="font-display text-4xl md:text-5xl text-balance max-w-3xl">How it works</h2>
        <ol className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            { t: "Pitch your course", b: "Tell us what you'd love to teach. We help you shape the outline." },
            { t: "Film at your pace", b: "Bring a phone, a tripod, and a quiet room. We provide the rest." },
            { t: "Run live cohorts", b: "Open enrollment, weekly circles, lifetime access for your learners." },
          ].map((s, i) => (
            <li key={s.t}>
              <div className="font-display text-5xl text-primary">0{i + 1}</div>
              <h3 className="font-display text-2xl mt-3">{s.t}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{s.b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Back home</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Teach;
