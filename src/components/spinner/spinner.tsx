import React from "react";
import "./spinner.scss";

type Size = "s" | "m" | "l";

interface SpinnerProps {
  size?: Size;
  className?: string;
}

export default function Spinner({ size = "m", className = "" }: SpinnerProps) {
  const sizeClass = `spinner--${size}`;

  return (
    <span
      className={`spinner ${sizeClass} ${className}`.trim()}
      role="status"
      aria-label="Loading"
    >
      <span className="spinner__circle" />
      <span className="visually-hidden">Loading</span>
    </span>
  );
}
