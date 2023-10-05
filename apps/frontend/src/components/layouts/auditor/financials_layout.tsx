import React from "react";
import DashBoardPageLayout from "@components/layouts/auditor/dashboard/dashboard_page_layout";
import { useRouter } from "next/router";

interface FinancialsLayoutProps {
  children: React.ReactNode;
  showexport: boolean;
}
export default function FinancialsLayout({
  children,
  showexport,
}: FinancialsLayoutProps) {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Profit & Loss",
      path: `/applications/${applicationID}/financial/profit`,
    },
    {
      id: 2,
      title: "Balance Sheet",
      path: `/applications/${applicationID}/financial/balance`,
    },
    {
      id: 3,
      title: "Cash Flow",
      path: `/applications/${applicationID}/financial/cash`,
    },
  ];
  return (
    <DashBoardPageLayout
      showexport={showexport}
      sortBarData={SortbarData}
      exporter={""}
      importer={""}
      date={""}
    >
      {children}
    </DashBoardPageLayout>
  );
}
