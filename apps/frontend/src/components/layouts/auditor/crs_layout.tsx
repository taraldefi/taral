import React from "react";
import { SortBarItem } from "src/types";
import DashBoardPageLayout from "@components/layouts/auditor/dashboard/dashboard_page_layout";

interface CRSLayoutProps {
  children: React.ReactNode;
  showexport: boolean;
  sortBarData: SortBarItem[];
}
export default function CRSLayout({
  children,
  showexport,
  sortBarData,
}: CRSLayoutProps) {
  return (
    <DashBoardPageLayout
      showexport={showexport}
      sortBarData={sortBarData}
      exporter={""}
      importer={""}
      date={""}
    >
      {children}
    </DashBoardPageLayout>
  );
}
