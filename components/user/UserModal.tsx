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

  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const [newPasswordError, setNewPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Fetch user data on modal open
  // -----------------------------
  useEffect(() => {
    const fetchUser = async () => {
      if (!isOpen || !userId) return;

      try {
        const res = await axios.get(`/users/${userId}`);
        const user = res.data;

        setName(user.name || "");
        setEmail(user.email || "");

        // Save original values for change detection
        setOriginalName(user.name || "");
        setOriginalEmail(user.email || "");
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  // Validates password
  const isValidPassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  const isPasswordPairFilled =
    currentPassword.length > 0 || newPassword.length > 0;

  const isPasswordPairValid =
    currentPassword.length > 0 && newPassword.length > 0;

  const isNewPasswordValid =
    !newPassword || isValidPassword(newPassword);

  const isSamePassword =
    currentPassword &&
    newPassword &&
    currentPassword === newPassword;

  const isProfileChanged =
    name !== originalName || email !== originalEmail;

  const isPasswordBeingChanged =
    currentPassword.length > 0 || newPassword.length > 0;

  const isSaveDisabled =
    loading ||

    (isPasswordPairFilled && !isPasswordPairValid) || 
    !isNewPasswordValid ||                            
    isSamePassword ||                                 

    (!isProfileChanged && !isPasswordBeingChanged);

  const handleSubmit = async () => {
    if (isSaveDisabled) return;

    setLoading(true);

    try {
      await axios.put(`/users/${userId}`, {
        name,
        email,
        currentPassword,
        newPassword,
      });

      // Reset password fields after successful update
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
        {loading && <LoadingScreen text="Saving..." fullScreen />}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-lg">Edit Profile</h2>
          </div>

          <button
            onClick={() => !loading && onClose()}
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
              <button onClick={() => setShowPasswordCurrent(v => !v)} type="button"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                {showPasswordCurrent ? <EyeClosed className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setNewPassword(value);

                  if (!value) return setNewPasswordError("");
                  if (!isValidPassword(value)) {
                    return setNewPasswordError("Password does not meet requirements");
                  }

                  setNewPasswordError("");
                }}
                className="w-full bg-transparent outline-none text-sm"
              />
              <button onClick={() => setShowPasswordNew(v => !v)} type="button"
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                {showPasswordNew ? <EyeClosed className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
          </FloatingField>

          {/* Password errors */}
          {newPasswordError && (
            <p className="text-xs text-red-500 mt-1">{newPasswordError}</p>
          )}

          {isSamePassword && (
            <p className="text-xs text-red-500">
              New password must be different from current password
            </p>
          )}

          {isPasswordPairFilled && !isPasswordPairValid && (
            <p className="text-xs text-red-500">
              Both current and new password are required
            </p>
          )}

          {/* Password requirements */}
          <div className="text-xs mt-2 space-y-1 text-zinc-500 flex justify-center gap-4">
            <div>
              <p className={newPassword.length >= 8 ? "text-green-500" : ""}>
                • At least 8 characters
              </p>
              <p className={/[0-9]/.test(newPassword) ? "text-green-500" : ""}>
                • One number
              </p>
            </div>
            <div>
              <p className={/[A-Z]/.test(newPassword) ? "text-green-500" : ""}>
                • One uppercase letter
              </p>
              <p className={/[a-z]/.test(newPassword) ? "text-green-500" : ""}>
                • One lowercase letter
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={() => !loading && onClose()} 
          className="px-3 py-1.5 rounded-lg text-sm
                       bg-white/60 dark:bg-zinc-900/40
                       border border-zinc-200 dark:border-zinc-700
                       hover:bg-white dark:hover:bg-zinc-800 transition">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSaveDisabled}
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