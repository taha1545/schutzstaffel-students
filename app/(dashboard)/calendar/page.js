"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { activeTasks } from "@/services/dashboradServices";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function CalendarPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Fetch active tasks for user
  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const res = await activeTasks(user.id);
        const userTasks = res.userTasks || [];
        setTasks(userTasks.map(ut => ({
          id: ut.task.id,
          title: ut.task.title,
          description: ut.task.description,
          deadline: ut.task.deadline,
          submitted: ut.status === "Completed",
          isCritical: ut.task.isCritical || false
        })));
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  // Generate calendar days
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));

  const formatDate = date => date.toISOString().split("T")[0];

  // Map tasks to a dictionary for fast lookup
  const taskEvents = tasks.reduce((acc, task) => {
    const dateKey = task.deadline.split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {});

  const upcomingDeadlines = tasks
    .filter(task => task.deadline.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const handleDayClick = (date) => date && setSelectedDate(date);

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
          <h2 className="text-gray-400 font-mono uppercase tracking-widest text-sm">
            ▶ Tactical Calendar
          </h2>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter">
            Deadlines & Events
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-[#1c252e] border-2 border-white/10 clip-path-angle p-6 space-y-6">
            <h2 className="text-3xl font-display font-black text-center uppercase italic">
              {MONTHS[month]} {year}
            </h2>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="text-center text-xs font-mono font-bold text-primary">{day}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                if (!day) return <div key={idx} className="h-10" />;

                const dateStr = formatDate(day);
                const dayTasks = taskEvents[dateStr];

                return (
                  <div
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square flex items-center justify-center cursor-pointer border rounded-md transition
                      ${dayTasks ? "bg-destructive/10 border-destructive hover:border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}
                    `}
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date / Upcoming Deadlines */}
          <div className="space-y-6">
            {selectedDate ? (
              <div className="bg-[#1c252e] border-2 border-white/10 clip-path-angle p-6 space-y-2">
                {taskEvents[formatDate(selectedDate)] ? (
                  taskEvents[formatDate(selectedDate)].map(task => (
                    <div key={task.id} className="flex items-start gap-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-destructive mt-1" />
                      <div>
                        <p className="text-xs font-mono uppercase text-gray-400">{selectedDate.toDateString()}</p>
                        <h3 className="text-xl font-display font-bold text-white mt-1">{task.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 font-mono text-sm text-center">
                    No tasks on {selectedDate.toDateString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-[#1c252e] border-2 border-white/10 clip-path-angle p-6 text-center">
                <p className="text-gray-400 font-mono text-sm">Select a date to see task details</p>
              </div>
            )}

            {/* Upcoming Deadlines */}
            <div className="bg-[#1c252e] border-2 border-white/10 clip-path-angle p-6 space-y-3">
              <h3 className="text-lg font-display font-bold text-white uppercase">Upcoming Deadlines</h3>
              <div className="space-y-2">
                {upcomingDeadlines.length ? (
                  upcomingDeadlines.map(task => (
                    <div key={task.id} className="p-3 border-l-2 border-destructive bg-destructive/10 cursor-pointer">
                      <p className="text-xs font-mono text-gray-400">{new Date(task.deadline).toDateString()}</p>
                      <p className="text-sm font-display font-bold text-white">{task.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 font-mono text-sm">No upcoming deadlines this month</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
