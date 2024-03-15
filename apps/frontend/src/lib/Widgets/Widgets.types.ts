import React from "react";

// Generated with util/create-component.js
export interface StatusWidgetProps {
  type: "Active" | "Review" | "Completed" | "Change" | "Up" | "Down";
  icon?: React.ReactNode;
  showIcon: boolean;
}

export interface ProgressBarWidgetProps {
  progress: number;
  color: string;
  showText: boolean;
}

export interface MetricProps {
  value: number;
}

export interface ActivityProps {
  user: string;
  activity: string;
  date: string;
  status: boolean;
}

export interface CircularLoaderProps {
  color: string;
  bgColor?: string;
  size?: string;
}
