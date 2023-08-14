import React from "react";

// Generated with util/create-component.js
export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}
