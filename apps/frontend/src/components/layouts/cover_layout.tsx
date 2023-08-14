import React from "react";
import DashBoardPageLayout from "@components/layouts/dashboard_page_layout";

interface ReportLayoutProps {
  children: React.ReactNode;
  documentCount: number;
  sortbarData: any;
}
export default function ReportLayout({
  children,
  documentCount,
  sortbarData,
}: ReportLayoutProps) {
  return (
    <DashBoardPageLayout
      showexport={true}
      sortBarData={sortbarData}
      exporter={""}
      importer={""}
      date={""}
    >
      <div className="main_container">
        <span className="subheading">{documentCount} Documents</span>
        {children}
      </div>
    </DashBoardPageLayout>
  );
}
