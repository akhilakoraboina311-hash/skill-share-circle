import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileText, BookOpen } from "lucide-react";
import { AppNav } from "@/components/app/AppNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUser } from "@/lib/auth";
import { toast } from "sonner";

const professorNav = [
  { to: "/professor", label: "Home" },
  { to: "/upload", label: "Upload Content" },
  { to: "/professor/courses", label: "My Courses" },
  { to: "/profile", label: "Profile" },
];

const CATEGORIES = ["Programming", "Data Science", "Art & Design", "Music", "Photography", "Communication", "Business"];

export default function Upload() {
  const navigate = useNavigate();
  const user = getUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [reference, setReference] = useState("");
  const [notesPdf, setNotesPdf] = useState("");

  useEffect(() => {
    document.title = "Upload Course · Skill Share Circle";
    if (!user || user.role !== "professor") navigate("/login");
  }, [navigate, user]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setVideoUrl("");
    setThumbnail("");
    setReference("");
    setNotesPdf("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !videoUrl || !thumbnail) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Course uploaded! (frontend demo)");
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav items={professorNav} />
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-3xl">
        <header className="mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-blue text-primary-foreground shadow-glow">
              <UploadIcon className="h-5 w-5" />
            </span>
            Upload a Course
          </h1>
          <p className="text-muted-foreground mt-2">
            Share what you know with the Skill Share Circle community. All courses are free.
          </p>
        </header>

        <form
          onSubmit={submit}
          className="bg-card border border-border rounded-2xl shadow-card p-6 sm:p-8 space-y-5 animate-fade-up"
        >
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g. Intro to Watercolor Painting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What will students learn?"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="video">Video URL</Label>
              <Input
                id="video"
                placeholder="https://youtube.com/embed/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="thumb">Thumbnail URL</Label>
            <Input
              id="thumb"
              placeholder="https://..."
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Optional resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="reference" className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Reference link
                </Label>
                <Input
                  id="reference"
                  placeholder="https://example.com/reading-material"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Article, book, or website students can read alongside.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="notes" className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-primary" />
                  Notebook / Notes PDF URL
                </Label>
                <Input
                  id="notes"
                  placeholder="https://example.com/notes.pdf"
                  value={notesPdf}
                  onChange={(e) => setNotesPdf(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Link to a PDF with notes or workbook for this course.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit" className="font-semibold shadow-glow hover:shadow-hover transition-shadow">
              <UploadIcon className="h-4 w-4" />
              Upload course
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
