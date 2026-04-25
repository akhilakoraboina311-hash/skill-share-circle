import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/lib/courses";
import hero from "@/assets/hero-learner.jpg";

const categories = ["Ceramics", "Music", "Cooking", "Painting", "Lettering", "Code", "Photography", "Writing"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-paper">
        <div className="container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Peer-driven learning
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
              Learn the
              <span className="italic text-primary"> craft</span>,
              <br />
              not just the theory.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Kindling is an affordable, community-led platform where curious people
              teach the things they love — and learn alongside one another.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm">
                <Link to="/courses">
                  Explore courses <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-foreground/20 hover:bg-secondary">
                <Link to="/teach">Teach on Kindling</Link>
              </Button>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "12k", v: "learners" },
                { k: "340", v: "courses" },
                { k: "4.9", v: "avg. rating" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl">{s.k}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-5 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-sunset rounded-[2rem] opacity-20 blur-2xl" />
              <img
                src={hero}
                alt="A learner with a notebook in warm afternoon light"
                width={1280}
                height={1600}
                className="relative rounded-[2rem] object-cover w-full aspect-[4/5] shadow-card"
              />
              <div className="absolute -bottom-6 -left-6 hidden md:block bg-card border border-border rounded-2xl p-4 shadow-card max-w-[220px]">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-2 text-sm font-display italic leading-snug">
                  "Felt like a Sunday workshop with friends."
                </p>
                <p className="mt-1 text-xs text-muted-foreground">— Yuki, calligraphy cohort</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-border/60 bg-background/40">
          <div className="overflow-hidden">
            <div className="flex gap-12 py-4 animate-marquee whitespace-nowrap font-display text-2xl text-muted-foreground">
              {[...categories, ...categories, ...categories].map((c, i) => (
                <span key={i} className="flex items-center gap-12">
                  {c}
                  <span className="text-primary">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">This month</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-balance">Hand-picked, peer-loved.</h2>
          </div>
          <Link to="/courses" className="hidden md:inline-flex items-center gap-1 text-sm hover:text-primary transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="container mx-auto px-6 py-24 grid md:grid-cols-3 gap-10">
          {[
            { icon: Users, title: "Learn with others", body: "Weekly cohort circles, peer reviews, and co-working rooms — never alone." },
            { icon: BookOpen, title: "Taught by makers", body: "Working potters, bakers, engineers and writers. People who do the thing." },
            { icon: Sparkles, title: "Honestly priced", body: "Most courses under $50. Pay-what-you-can scholarships for every cohort." },
          ].map((f) => (
            <div key={f.title} className="bg-card rounded-2xl p-8 border border-border/60 shadow-soft">
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl mt-5">{f.title}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teach CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="rounded-3xl bg-gradient-sunset p-10 md:p-16 relative overflow-hidden grain">
          <div className="relative max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/80">For instructors</span>
            <h2 className="font-display text-4xl md:text-6xl mt-4 text-primary-foreground text-balance">
              Teach what you love. Earn what you're worth.
            </h2>
            <p className="mt-5 text-primary-foreground/90 text-lg max-w-lg">
              Keep 80% of every enrollment. We handle hosting, payments, and the warmest learner community on the internet.
            </p>
            <Button size="lg" asChild className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/teach">Start teaching <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
