"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activeTasks, updateUserTask } from "@/services/dashboradServices";
import { useAuth } from "@/hooks/useAuth";
import { MissionCompleteStamp } from "@/components/MissionCompleteStamp";

export default function TasksPage() {
  const { user, refreshUser } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [filterGoal, setFilterGoal] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMissionComplete, setShowMissionComplete] = useState(false);


  // Fetch tasks
  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const res = await activeTasks(user.id);
        const userTasks = res.userTasks || [];
        setTasks(
          userTasks.map(ut => ({
            id: ut.task.id,
            title: ut.task.title,
            description: ut.task.description,
            deadline: new Date(ut.task.deadline).toLocaleDateString(),
            isUsedKey: ut.task.isUsedKey,
            taskKey: ut.task.taskKey || "",
            xpPoint: ut.task.xpPoints,
            submitted: ut.status === "Completed",
            keySubmitted: ut.keySubmitted || "",
            userNote: ut.note || "",
            goal: ut.task.goal,
            userTaskId: ut.id
          }))
        );
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  // Handle submit task
  const handleSubmitTask = async (userTaskId, taskID, note, key) => {
    setError("");
    const task = tasks.find(t => t.id === taskID);
    if (task.isUsedKey && key !== task.taskKey) {
      setError("Invalid key submitted!");
      return;
    }
    try {
      const res = await updateUserTask(userTaskId, { note, keySubmitted: key });
      if (!res.success) {
        setError(res.message || "Failed to submit task.");
        return;
      }
      refreshUser();
      setSelectedTask(null);
      // Trigger the Mission Complete animation
      setShowMissionComplete(true);
    } catch {
      setError("Failed to submit task. Try again.");
    }
  };


  // Generate goals from tasks dynamically
  const goals = useMemo(() => {
    const uniqueGoals = [...new Map(tasks.map(t => [t.goal.id, t.goal])).values()];
    return uniqueGoals;
  }, [tasks]);

  // Filter tasks
  const filteredTasks = tasks.filter(task =>
    filterGoal === "all" || task.goal.id === parseInt(filterGoal)
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    submitted: { backgroundColor: "#064e3b", transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white">
        Loading tasks...
      </div>
    );
  }

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
        <div className="bg-card border border-accent-foreground clip-path-angle p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative w-full md:w-64">
            <select
              value={filterGoal}
              onChange={e => setFilterGoal(e.target.value)}
              className="appearance-none w-full bg-[#0F1923] border border-white/20 text-white text-sm font-mono px-4 py-2 pr-10 rounded-lg focus:outline-none focus:border-primary transition shadow-sm hover:border-primary cursor-pointer"
            >
              <option value="all">All Goals</option>
              {goals.map(goal => (
                <option key={goal.id} value={goal.id}>{goal.name}</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mission Complete Animation */}
        <AnimatePresence>
          {showMissionComplete && (
            <MissionCompleteStamp onComplete={() => setShowMissionComplete(false)} />
          )}
        </AnimatePresence>



        {/* Task Cards */}
        <motion.div className="flex flex-col gap-6">
          <AnimatePresence>
            {filteredTasks.map(task => (
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
                    {task.submitted && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 font-bold text-lg">✅ Submitted</motion.span>}
                    {task.isUsedKey && !task.submitted && <span className="text-xs font-mono bg-primary/20 text-white px-2 py-1 rounded-md">Key Required</span>}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 whitespace-pre-wrap">{task.description}</p>

                <div className="flex flex-wrap justify-between gap-2 mb-2 text-xs font-mono text-gray-500">
                  <span>Deadline: {task.deadline}</span>
                  <span>XP: <span className="text-accent font-bold">{task.xpPoint}</span></span>
                  <span>Domain: {task.goal.domain}</span>
                </div>

                <div className="flex flex-wrap justify-between gap-2 text-xs font-mono text-gray-400">
                  <span>Goal: {task.goal.name}</span>
                </div>
              </motion.div>
            ))}
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

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <form
                onSubmit={e => {
                  e.preventDefault();
                  const note = e.target.note.value;
                  const key = e.target.taskKey?.value || "";

                  handleSubmitTask(
                    selectedTask.userTaskId,
                    selectedTask.id,
                    note,
                    key
                  );
                }}
                className="flex flex-col gap-3"
              >

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
                  <button type="button" onClick={() => { setSelectedTask(null); setError(""); }} className="bg-white/10 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition">Cancel</button>
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
