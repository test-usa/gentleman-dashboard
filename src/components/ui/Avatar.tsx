import React from "react";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number; // Size in pixels (default: 40)
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name = "", size = 40, alt = "User Avatar" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="rounded-full bg-gray-300 flex items-center justify-center overflow-hidden text-white font-medium"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
