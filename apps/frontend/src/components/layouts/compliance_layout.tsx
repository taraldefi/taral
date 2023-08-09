import React from "react";
import DashBoardPageLayout from "@components/layouts/dashboard_page_layout";
import { useRouter } from "next/router";

interface ComplianceLayoutProps {
  children: React.ReactNode;
  showexport: boolean;
}
export default function ComplianceLayout({
  children,
  showexport,
}: ComplianceLayoutProps) {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Company",
      path: `/applications/${applicationID}/compliance/company`,
    },
    {
      id: 2,
      title: "Screening",
      path: `/applications/${applicationID}/compliance/screening`,
    },
    {
      id: 3,
      title: "Persons",
      path: `/applications/${applicationID}/compliance/persons`,
    },
    {
      id: 4,
      title: "Documents",
      path: `/applications/${applicationID}/compliance/documents`,
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
