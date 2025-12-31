export interface LocalQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: "Behavioral" | "Leadership" | "Problem Solving" | "System Design" | "Technical";
  tips?: string;
  example_answer?: string;
}

export const questions: LocalQuestion[] = [
  // 🔹 PROBLEM SOLVING (DSA)
  {
    id: "ps-1",
    title: "Factorial using Recursion",
    description: "Write a recursive function to calculate factorial of a number.",
    difficulty: "easy",
    category: "Problem Solving",
    tips: "Base case: factorial(0) = 1",
    example_answer: `int fact(int n){
  if(n == 0) return 1;
  return n * fact(n - 1);
}`,
  },
  {
    id: "ps-2",
    title: "Fibonacci using Recursion",
    description: "Return the nth Fibonacci number using recursion.",
    difficulty: "medium",
    category: "Problem Solving",
    tips: "Avoid repeated calls using memoization",
    example_answer: `int fib(int n){
  if(n <= 1) return n;
  return fib(n-1) + fib(n-2);
}`,
  },

  // 🔹 LEADERSHIP
  {
    id: "ld-1",
    title: "Describe a time you led a team",
    description: "Explain how you handled leadership responsibilities.",
    difficulty: "medium",
    category: "Leadership",
    tips: "Use STAR method",
    example_answer: "I led a team of 4 members during a college project...",
  },

  // 🔹 BEHAVIORAL
  {
    id: "bh-1",
    title: "Tell me about yourself",
    description: "Give a brief professional introduction.",
    difficulty: "easy",
    category: "Behavioral",
  },
  // 🔹 SYSTEM DESIGN
{
  id: "sd-1",
  title: "Design a URL Shortener",
  description: "Design a scalable URL shortening service like bit.ly.",
  difficulty: "hard",
  category: "System Design",
  tips: "Discuss hashing, database schema, scalability, and caching.",
  example_answer: `
Use a base62 encoding for short URLs.
Store mapping in a database.
Use cache (Redis) for fast lookup.
Handle collisions and scaling.
`,
},
{
  id: "sd-2",
  title: "Design a Chat Application",
  description: "Design a real-time chat application like WhatsApp.",
  difficulty: "medium",
  category: "System Design",
  tips: "WebSockets, message queues, database design.",
},

// 🔹 TECHNICAL
{
  id: "tech-1",
  title: "Explain difference between var, let and const",
  description: "Explain scope and hoisting differences.",
  difficulty: "easy",
  category: "Technical",
  example_answer: `
var → function scoped
let → block scoped
const → block scoped, cannot be reassigned
`,
},
{
  id: "tech-2",
  title: "What is Event Loop in JavaScript?",
  description: "Explain how async code works in JS.",
  difficulty: "medium",
  category: "Technical",
  tips: "Call stack, callback queue, microtasks.",
},

];
