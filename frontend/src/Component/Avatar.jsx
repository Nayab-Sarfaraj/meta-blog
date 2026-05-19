import React, { useState } from "react";

// Deterministic background colour from name
const getBgColor = (name = "") => {
  const colors = [
    "bg-violet-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name = "") => {
  const trimmed = name.trim();
  if (!trimmed) return null; // no name → no initials, will show generic icon
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Avatar component
 * - Shows the image if src is valid and loads without error
 * - Falls back to coloured circle with initials if name is available
 * - Falls back to a neutral grey circle with a person silhouette if no name
 *
 * Props:
 *   src        – image URL (optional)
 *   name       – user's name, used to derive initials (optional)
 *   size       – tailwind h/w classes e.g. "h-7 w-7" (default "h-9 w-9")
 *   className  – extra classes (ring, border, etc.)
 */
const Avatar = ({ src, name = "", size = "h-9 w-9", className = "" }) => {
  const [imgError, setImgError] = useState(false);

  const showImage = src && !imgError;
  const initials = getInitials(name);
  const bgColor = getBgColor(name);

  if (showImage) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        className={`${size} rounded-full object-cover shrink-0 ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  if (initials) {
    return (
      <div
        className={`${size} ${bgColor} rounded-full flex items-center justify-center shrink-0 ${className}`}
        title={name}
      >
        <span className="text-white font-bold text-[55%] leading-none select-none">
          {initials}
        </span>
      </div>
    );
  }

  // No name and no image — neutral grey circle with a simple person shape
  return (
    <div
      className={`${size} bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[55%] h-[55%] text-white"
      >
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
};

export default Avatar;
