import React from "react";
import DashBoardPageLayout from "@components/layouts/auditor/dashboard/dashboard_page_layout";
import { useRouter } from "next/router";

interface StatusLayoutProps {
  children: React.ReactNode;
  showexport: boolean;
}
export default function StatusLayout({
  children,
  showexport,
}: StatusLayoutProps) {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Overview",
      path: `/applications/${applicationID}/status/overview`,
    },
    {
      id: 2,
      title: "Audit Trail",
      path: `/applications/${applicationID}/status/audit`,
    },
    {
      id: 3,
      title: "Tasks & Team",
      path: `/applications/${applicationID}/status/tasks_teams`,
    },
    {
      id: 4,
      title: "Customer Comms.",
      path: `/applications/${applicationID}/status/customer_comms`,
    },
  ];
  return (
    <DashBoardPageLayout
      showexport={showexport}
      sortBarData={SortbarData}
      exporter={"Exporter"}
      importer={"Importer"}
      date={""}
    >
      {children}
    </DashBoardPageLayout>
  );
}
