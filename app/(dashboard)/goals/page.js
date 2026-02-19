"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

// MOCK GOALS
const MOCK_GOALS = [
  { id: 1, name: "JavaScript Fundamentals", description: "Learn JS basics", duration: "2 weeks", domain: "Web", teacher: "Dr. Peterson" },
  { id: 2, name: "React Mastery", description: "Build React apps", duration: "3 weeks", domain: "Web", teacher: "Ms. Chen" }
];

// MOCK TASKS
const MOCK_TASKS = [
  { id: 1, goalID: 1, title: "Hoisting Exercise", description: "Understand variable hoisting and scope, including var, let, and const. Make sure to check the differences in behavior in loops and functions.", deadline: "2026-02-20", isUsedKey: true, taskKey: "ABC123", xpPoint: 50, submitted: false, userNote: "" },
  { id: 2, goalID: 1, title: "Closure Challenge", description: "Practice closures, including nested functions and returning functions with retained lexical scope. This task has a long description to test wrapping and card layout.", deadline: "2026-02-22", isUsedKey: false, taskKey: "", xpPoint: 75, submitted: false, userNote: "" },
  { id: 3, goalID: 2, title: "React Props Drill", description: "Pass props between components efficiently. Handle multiple layers of nested components. Consider using Context API for optimization.", deadline: "2026-02-25", isUsedKey: true, taskKey: "", xpPoint: 100, submitted: false, userNote: "" },
  {
    id: 4,
    goalID: 2,
    title: "Advanced JavaScript Asynchronous Patterns and Optimization Techniques for High-Performance Web Applications in Modern Browsers",
    description: `This task challenges you to deeply explore asynchronous programming in JavaScript, including but not limited to Promises, async/await, and the Event Loop. 
You are expected to implement a series of functions that fetch data from multiple APIs concurrently, handle errors gracefully, and optimize response times using techniques such as throttling, debouncing, and memoization. 
Additionally, experiment with Web Workers to offload computationally heavy tasks, ensuring smooth UI rendering. 
Document your approach, include code comments explaining why each asynchronous pattern was chosen, and provide performance benchmarks. 
The goal is to develop a practical understanding of how modern browsers handle asynchronous operations and how you can structure your code to maximize performance, maintainability, and scalability.imes using techniques such as throttling, debouncing, and memoization. 
Additionally, experiment with Web Workers to offload computationally heavy tasks, ensuring smooth UI rendering. 
Document your approach, include code comments explaining why each asynchronous pattern was chosen, and provide performance benchmarks. 
The goal is to develop a practical understanding of how modern browsers handle asynchronous operations and how you can structure your code to maximize performance, maintainability, and scalabilitimes using techniques such as throttling, debouncing, and memoization. 
Additionally, experiment with Web Workers to offload computationally heavy tasks, ensuring smooth UI rendering. 
Document your approach, include code comments explaining why each asynchronous pattern was chosen, and provide performance benchmarks. 
The goal is to develop a practical understanding of how modern browsers handle asynchronous operations and how you can structure your code to maximize performance, maintainability, and scalabilitimes using techniques such as throttling, debouncing, and memoization. 
Additionally, experiment with Web Workers to offload computationally heavy tasks, ensuring smooth UI rendering. 
Document your approach, include code comments explaining why each asynchronous pattern was chosen, and provide performance benchmarks. 
The goal is to develop a practical understanding of how modern browsers handle asynchronous operations and how you can structure your code to maximize performance, maintainability, and scalabilit`,
    deadline: "2026-03-01",
    isUsedKey: true,
    taskKey: "dsafdsaf",
    xpPoint: 200,
    submitted: false,
    userNote: ""
  }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [filterGoal, setFilterGoal] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSubmitTask = (taskID, note, key) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskID
          ? { ...t, submitted: true, userNote: note, taskKey: t.isUsedKey ? key : "" }
          : t
      )
    );
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesGoal = filterGoal === "all" || task.goalID === parseInt(filterGoal);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGoal && matchesSearch;
  });

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    submitted: { backgroundColor: "#064e3b", transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <motion.div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-gray-400 font-mono uppercase tracking-widest text-sm">▶ TASK LOG</h2>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter">Active Tasks</h1>
          <p className="text-gray-400 font-mono text-sm max-w-2xl">
            Complete objectives to earn XP and level up. Some tasks require a key to submit.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-[#1c252e] border border-white/10 clip-path-angle p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3 w-4 h-4 text-primary/50" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#0F1923] border border-white/10 pl-10 pr-4 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none transition rounded-md"
            />
          </div>

          <select
            value={filterGoal}
            onChange={e => setFilterGoal(e.target.value)}
            className="bg-[#0F1923] border border-white/10 px-4 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none transition cursor-pointer rounded-md uppercase"
          >
            <option value="all">All Goals</option>
            {MOCK_GOALS.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.name}</option>
            ))}
          </select>
        </div>

        {/* Task Cards */}
        <motion.div className="flex flex-col gap-6">
          <AnimatePresence>
            {filteredTasks.map(task => {
              const goal = MOCK_GOALS.find(g => g.id === task.goalID);
              return (
                <motion.div
                  key={task.id}
                  initial="hidden"
                  animate={task.submitted ? "submitted" : "visible"}
                  exit={{ opacity: 0, y: -20 }}
                  variants={cardVariants}
                  className="border border-white/10 p-6 cursor-pointer relative rounded-xl shadow-xl hover:shadow-primary/50 transition-all w-full break-words"
                  onClick={() => !task.submitted && setSelectedTask(task)}
                >
                  <div className="flex justify-between flex-wrap gap-2 mb-2 items-start">
                    <h3 className="text-white font-display font-bold text-xl">{task.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {task.submitted && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-400 font-bold text-lg"
                        >
                          ✅ Submitted
                        </motion.span>
                      )}
                      {task.isUsedKey && !task.submitted && (
                        <span className="text-xs font-mono bg-primary/20 text-white px-2 py-1 rounded-md">Key Required</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 whitespace-pre-wrap">{task.description}</p>

                  <div className="flex flex-wrap justify-between gap-2 mb-2 text-xs font-mono text-gray-500">
                    <span>Deadline: {task.deadline}</span>
                    <span>XP: <span className="text-accent font-bold">{task.xpPoint}</span></span>
                    <span>Goal Duration: {goal?.duration}</span>
                    <span>Domain: {goal?.domain}</span>
                  </div>

                  <div className="flex flex-wrap justify-between gap-2 text-xs font-mono text-gray-400">
                    <span>Goal: {goal?.name}</span>
                    <span>Teacher: {goal?.teacher}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Task Submission Popup */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#1c252e] p-6 rounded-xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-4">{selectedTask.title}</h2>
              <p className="text-gray-400 text-sm mb-4 whitespace-pre-wrap">{selectedTask.description}</p>

              <form onSubmit={e => {
                e.preventDefault();
                const note = e.target.note.value;
                const key = e.target.taskKey?.value || "";
                handleSubmitTask(selectedTask.id, note, key);
              }} className="flex flex-col gap-3">
                {selectedTask.isUsedKey && !selectedTask.submitted && (
                  <input
                    type="text"
                    name="taskKey"
                    placeholder="Enter Task Key"
                    required
                    className="bg-[#0F1923] border border-white/10 px-4 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none transition rounded-md"
                  />
                )}
                <textarea
                  name="note"
                  placeholder="Add a note (optional)"
                  className="bg-[#0F1923] border border-white/10 px-4 py-2 text-white font-mono text-sm focus:border-primary focus:outline-none transition rounded-md"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setSelectedTask(null)} className="bg-white/10 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition">Cancel</button>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md font-bold hover:bg-green-600 transition">Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}