"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Only deadlines for simplicity
const MOCK_EVENTS = {
  "2026-02-05": { title: "JavaScript Quiz", description: "Complete quiz on JS basics.", critical: true },
  "2026-02-08": { title: "React Project Due", description: "Submit your React project.", critical: true },
  "2026-02-15": { title: "Midterm Exam", description: "Midterm exam for module.", critical: true },
  "2026-02-20": { title: "Group Project", description: "Submit group project.", critical: true },
};

export default function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);

  const year = today.getFullYear();
  const month = today.getMonth(); 
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  //
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null); 
  for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));

  const handleDayClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  // Get upcoming deadlines for this month
  const upcomingDeadlines = Object.entries(MOCK_EVENTS)
    .filter(([date]) => date.startsWith(`${year}-0${month + 1}`)) 
    .sort(([a], [b]) => a.localeCompare(b));

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
            {/* Month */}
            <h2 className="text-3xl font-display font-black text-center uppercase italic">
              {MONTHS[month]} {year}
            </h2>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((d) => (
                <div key={d} className="text-center text-xs font-mono font-bold text-primary">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                if (!day) return <div key={idx} className="h-10" />;

                const dateStr = formatDate(day);
                const event = MOCK_EVENTS[dateStr];

                return (
                  <div
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square flex items-center justify-center cursor-pointer border rounded-md transition
                      ${event ? "bg-destructive/10 border-destructive hover:border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}
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
            {/* Selected Date Details */}
            {selectedDate ? (
              <div className="bg-[#1c252e] border-2 border-white/10 clip-path-angle p-6 space-y-2">
                {MOCK_EVENTS[formatDate(selectedDate)] ? (
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1" />
                    <div>
                      <p className="text-xs font-mono uppercase text-gray-400">
                        {selectedDate.toDateString()}
                      </p>
                      <h3 className="text-xl font-display font-bold text-white mt-1">
                        {MOCK_EVENTS[formatDate(selectedDate)].title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {MOCK_EVENTS[formatDate(selectedDate)].description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 font-mono text-sm text-center">
                    No events on {selectedDate.toDateString()}
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
                  upcomingDeadlines.map(([date, event]) => (
                    <div
                      key={date}
                      className="p-3 border-l-2 border-destructive bg-destructive/10 cursor-pointer"
                    >
                      <p className="text-xs font-mono text-gray-400">{new Date(date).toDateString()}</p>
                      <p className="text-sm font-display font-bold text-white">{event.title}</p>
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
