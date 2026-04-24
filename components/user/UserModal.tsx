"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { X, Pencil, Eye, EyeClosed } from "lucide-react";
import FloatingField from "../ui/FloatingField";
import LoadingScreen from "../ui/LoadingScreen";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

/**
 * UserModal
 *
 * Handles editing user profile and password update.
 * Fetches user data on open and submits updates to API.
 */
export default function UserModal({
  isOpen,
  onClose,
  userId,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isOpen || !userId) return;

      try {
        const res = await axios.get(`/users/${userId}`);
        const user = res.data;

        setName(user.name || "");
        setEmail(user.email || "");
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.put(`/users/${userId}`, {
        name,
        email,
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      onClose();
    } catch (err) {
      console.error("Failed to update user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (!loading) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[420px] rounded-2xl border border-zinc-200 dark:border-zinc-700
                   bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl
                   shadow-2xl p-5 text-black dark:text-white"
      >
        {/* Loading Overlay */}
        {loading && <LoadingScreen text="Saving..." fullScreen={true} />}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-lg">Edit Profile</h2>
          </div>

          <button
            onClick={() => {
              if (!loading) onClose();
            }}
            className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-3">

          <FloatingField label="Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/60 dark:bg-zinc-900/40
                         border border-zinc-200 dark:border-zinc-700
                         rounded-lg px-3 h-10 text-sm outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </FloatingField>

          <FloatingField label="Email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/60 dark:bg-zinc-900/40
                         border border-zinc-200 dark:border-zinc-700
                         rounded-lg px-3 h-10 text-sm outline-none
                         focus:ring-2 focus:ring-blue-500"
            />
          </FloatingField>

          <FloatingField label="Current Password">
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700
                            rounded-lg px-3 h-10 bg-white/60 dark:bg-zinc-900/40
                            focus-within:ring-2 focus-within:ring-blue-500">

              <input
                type={showPasswordCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPasswordCurrent((v) => !v)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                {showPasswordCurrent ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </FloatingField>

          <FloatingField label="New Password">
            <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700
                            rounded-lg px-3 h-10 bg-white/60 dark:bg-zinc-900/40
                            focus-within:ring-2 focus-within:ring-blue-500">

              <input
                type={showPasswordNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPasswordNew((v) => !v)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                {showPasswordNew ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </FloatingField>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={() => {
              if (!loading) onClose();
            }}
            className="px-3 py-1.5 rounded-lg text-sm
                       bg-white/60 dark:bg-zinc-900/40
                       border border-zinc-200 dark:border-zinc-700
                       hover:bg-white dark:hover:bg-zinc-800 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg text-sm
                       bg-blue-500 hover:bg-blue-600 text-white transition
                       disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}