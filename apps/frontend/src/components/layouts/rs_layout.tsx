import React from "react";
import DashBoardPageLayout from "@components/layouts/dashboard_page_layout";
import { useRouter } from "next/router";

interface researchLayoutProps {
  children: React.ReactNode;
  showexport: boolean;
}
export default function ResearchLayout({
  children,
  showexport,
}: researchLayoutProps) {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Research",
      path: `/applications/${applicationID}/research/research`,
    },
    {
      id: 2,
      title: "Sentiment",
      path: `/applications/${applicationID}/research/sentiments`,
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
