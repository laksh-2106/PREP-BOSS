import { useState } from "react";
import { questions } from "../data/question";

const AdminAddQuestion = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Problem Solving");
  const [difficulty, setDifficulty] = useState("easy");

  const addQuestion = () => {
    const newQuestion = {
      id: `custom-${Date.now()}`,
      title,
      description: "Added by admin",
      category,
      difficulty,
    };

    const saved = JSON.parse(
      localStorage.getItem("admin-questions") || "[]"
    );

    localStorage.setItem(
      "admin-questions",
      JSON.stringify([...saved, newQuestion])
    );

    alert("Question added (localStorage)");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Admin – Add Question</h2>

      <input
        className="border p-2 w-full"
        placeholder="Question title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Behavioral</option>
        <option>Leadership</option>
        <option>Problem Solving</option>
        <option>System Design</option>
        <option>Technical</option>
      </select>

      <select
        className="border p-2 w-full"
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option>easy</option>
        <option>medium</option>
        <option>hard</option>
      </select>

      <button
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={addQuestion}
      >
        Add Question
      </button>
    </div>
  );
};

export default AdminAddQuestion;
