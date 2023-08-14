import React from "react";
import DashBoardPageLayout from "./dashboard_page_layout";

interface SignOffLayoutProps {
  children: React.ReactNode;
  showexport: boolean;
}
export default function SignOffLayout({
  children,
  showexport,
}: SignOffLayoutProps) {
  return (
    <DashBoardPageLayout
      showexport={showexport}
      exporter={""}
      importer={""}
      date={""}
    >
      {children}
    </DashBoardPageLayout>
  );
}
