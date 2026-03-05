"use client";

import { useState } from "react";
import { updateUser } from "@/services/authServices";
import Image from "next/image";

const gradeOptions = [
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

export default function ProfileUpdateCard({ user, onClose, onUpdated }) {
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        grade: user?.grade || "",
        image: user?.imagePath || "",
    });

    const [preview, setPreview] = useState(
        user?.imagePath
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.imagePath}`
            : null
    );

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // 
        if (name === "image" && files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: reader.result,
                });
                setPreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
        try {
            setSaving(true);
            setError("");
            // 
            const payload = {
                fullName: formData.fullName,
                grade: formData.grade,
                image: formData.image,
            };
            const res = await updateUser(payload);
            //
            if (onUpdated) onUpdated(res);
            if (onClose) onClose();
        } catch (err) {
            setError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#1c252e] border border-white/10 clip-path-angle p-8 relative">

                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <h3 className="text-2xl font-display font-bold text-white uppercase mb-6">
                    Update Profile
                </h3>

                {error && (
                    <div className="mb-4 text-red-400 text-sm font-mono">{error}</div>
                )}

                {/* Image Preview */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-2 border-primary overflow-hidden">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="preview"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                No Image
                            </div>
                        )}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="text-xs text-gray-400 font-mono uppercase">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full mt-1 text-sm text-gray-400"
                    />
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="text-xs text-gray-400 font-mono uppercase">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full mt-1 bg-[#0F1923] border border-white/10 px-3 py-2 text-white focus:border-primary focus:outline-none"
                    />
                </div>

                {/* Grade */}
                <div className="mb-6">
                    <label className="text-xs text-gray-400 font-mono uppercase">
                        Grade
                    </label>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full mt-1 bg-[#0F1923] border border-white/10 px-3 py-2 text-white focus:border-primary focus:outline-none"
                    >
                        <option value="">Select Grade</option>
                        {gradeOptions.map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-white/10 py-2 font-display uppercase hover:border-primary transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex-1 bg-primary text-black font-display uppercase py-2 hover:scale-105 transition"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
