import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, Check } from "lucide-react";
import Editor from "@monaco-editor/react";
import { questions as localQuestions } from  "../data/question";

/* ---------------- TYPES ---------------- */

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  tips?: string;
  example_answer?: string;
}

interface Progress {
  notes: string;
  status: "not_started" | "in_progress" | "completed";
}

/* ---------------- COMPONENT ---------------- */

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [progress, setProgress] = useState<Progress>({
    notes: "",
    status: "not_started",
  });
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD QUESTION ---------------- */

  useEffect(() => {
    const found = localQuestions.find((q) => q.id === id);

    if (!found) {
      navigate("/dashboard");
      return;
    }

    setQuestion(found);

    // Load saved progress from localStorage
    const saved = localStorage.getItem(`progress-${id}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }

    setLoading(false);
  }, [id, navigate]);

  /* ---------------- SAVE PROGRESS ---------------- */

  const saveProgress = (status: Progress["status"]) => {
    const updated = { ...progress, status };
    setProgress(updated);
    localStorage.setItem(`progress-${id}`, JSON.stringify(updated));
  };

  /* ---------------- UI HELPERS ---------------- */

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!question) return null;

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* Question */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div>
                <CardTitle className="text-2xl">{question.title}</CardTitle>
                <CardDescription className="mt-2">
                  {question.description}
                </CardDescription>
              </div>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Tips */}
        {question.tips && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>{question.tips}</CardContent>
          </Card>
        )}

        {/* C++ Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Your C++ Practice Code</CardTitle>
            <CardDescription>
              Write and practice your solution here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Editor
              height="300px"
              language="cpp"
              theme="vs-dark"
              value={progress.notes}
              onChange={(value) =>
                setProgress({ ...progress, notes: value || "" })
              }
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => saveProgress("in_progress")}
              >
                Save Progress
              </Button>
              <Button onClick={() => saveProgress("completed")}>
                <Check className="mr-2 h-4 w-4" />
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Example Answer */}
        {question.example_answer && (
          <Card>
            <CardHeader>
              <CardTitle>Example Answer</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {question.example_answer}
              </pre>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default QuestionDetail;
