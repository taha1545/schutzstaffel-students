"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, User } from "lucide-react";
import { ValorantButton } from "@/components/ValorantButton";
import { InputField } from "@/components/InputField";
import { useRouter } from "next/navigation";

const Grades = [
  "ING-1",
  "ING-2",
  "ING-3",
  "ING-4",
  "ING-5",
  "L-1",
  "L-2",
  "L-3",
  "M-1",
  "M-2",
];

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    grade: "",
  });

  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const router = useRouter();

  const HandleSignup = () => {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black italic uppercase text-white tracking-tight">
            Enroll Now
          </h1>
          <p className="text-gray-400 text-sm font-mono mt-4">
            Join schutzstaffel Academy
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1c252e] border border-white/10 p-10 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent" />

          <div className="space-y-6">
            {/* Email */}
            <InputField
              icon={<Mail size={16} />}
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="agent@schutzstaffel.ss"
            />

            {/* Full Name */}
            <InputField
              icon={<User size={16} />}
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your Full Name"
            />

            {/* Grade Select */}
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-3 font-mono tracking-wider">
                Grade
              </label>

              <div className="relative">
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#0F1923] border border-white/10 px-4 py-3 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary transition"
                >
                  <option value="" disabled>
                    Select your grade
                  </option>

                  {Grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>

                {/* Custom arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="pt-6 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="peer sr-only"
                  />

                  <div className="w-5 h-5 border border-white/20 bg-[#0F1923] 
                                  peer-checked:bg-primary 
                                  peer-checked:border-primary
                                  transition flex items-center justify-center">

                    <svg
                      className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
                  I agree to the{" "}
                  <span className="text-accent hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-accent hover:underline">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <ValorantButton fullWidth size="lg" onClick={HandleSignup} disabled={!agreed}>
                COMPLETE ENROLLMENT
              </ValorantButton>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500 font-mono">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Button (UI Only) */}
            <button
              className="w-full flex items-center justify-center gap-3 border border-white/10 bg-[#0F1923] py-3 text-sm text-white hover:border-primary hover:bg-[#16202a] transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-500 text-sm mt-8 font-mono">
          Already enrolled?{" "}
          <Link
            href="/auth"
            className="text-accent hover:text-accent/80 underline"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

