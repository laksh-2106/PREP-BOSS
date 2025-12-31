import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code,
  Users,
  Network,
  Crown,
  Lightbulb,
  LogOut,
} from "lucide-react";
import { questions as localQuestions } from "../data/question";

/* ---------------- TYPES ---------------- */

interface Category {
  name: string;
  icon: any;
}

interface Question {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

/* ---------------- CATEGORIES ---------------- */

const categories: Category[] = [
  { name: "Behavioral", icon: Users },
  { name: "Leadership", icon: Crown },
  { name: "Problem Solving", icon: Lightbulb },
  { name: "System Design", icon: Network },
  { name: "Technical", icon: Code },
];

/* ---------------- COMPONENT ---------------- */

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  /* ---------------- LOAD QUESTIONS ---------------- */

  useEffect(() => {
    if (selectedCategory) {
      setQuestions(
        localQuestions.filter(
          (q) => q.category === selectedCategory
        )
      );
    } else {
      setQuestions(localQuestions);
    }
  }, [selectedCategory]);

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

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">InterviewPrep</h1>
          <Button variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.name}
                  className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                    selectedCategory === category.name
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.name
                        ? null
                        : category.name
                    )
                  }
                >
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Questions */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {selectedCategory
                ? `${selectedCategory} Questions`
                : "All Questions"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {questions.length} questions
            </span>
          </div>

          <div className="grid gap-4">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => navigate(`/question/${question.id}`)}
              >
                <CardContent className="flex items-center justify-between p-6">
                  <h3 className="font-medium">{question.title}</h3>
                  <Badge
                    variant="outline"
                    className={getDifficultyColor(question.difficulty)}
                  >
                    {question.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}

            {questions.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No questions found in this category
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
