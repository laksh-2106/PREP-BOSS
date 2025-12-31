import { questions } from "../data/question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Progress = () => {
  const total = questions.length;

  const completed = questions.filter((q) => {
    const saved = localStorage.getItem(`progress-${q.id}`);
    if (!saved) return false;
    const data = JSON.parse(saved);
    return data.status === "completed";
  }).length;

  const percent = Math.round((completed / total) * 100);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Progress Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full bg-muted h-3 rounded">
            <div
              className="bg-primary h-3 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {completed} / {total} questions completed ({percent}%)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
