export const Footer = () => {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="font-display text-xl font-semibold">Kindling</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A peer-driven learning community for the curious. Affordable courses,
            taught by people who do the work.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base mb-3">Learn</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Browse courses</li><li>Topics</li><li>Cohorts</li><li>Gift a course</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base mb-3">Teach</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Become an instructor</li><li>Creator handbook</li><li>Studio tools</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <span>© {new Date().getFullYear()} Kindling. Made with care.</span>
          <span>Privacy · Terms · Contact</span>
        </div>
      </div>
    </footer>
  );
};
