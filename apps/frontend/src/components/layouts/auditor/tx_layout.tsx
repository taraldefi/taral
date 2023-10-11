import React from "react";
import DashBoardPageLayout from "@components/layouts/auditor/dashboard/dashboard_page_layout";
import { useRouter } from "next/router";

interface StatusLayoutProps {
  children: React.ReactNode;
}
export default function TxLayout({ children }: StatusLayoutProps) {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Supplier",
      path: `/applications/${applicationID}/transaction/supplier`,
    },
    {
      id: 2,
      title: "Buyer",
      path: `/applications/${applicationID}/transaction/buyer`,
    },
    {
      id: 3,
      title: "Transactions",
      path: `/applications/${applicationID}/transaction/transactions`,
    },
    {
      id: 4,
      title: "Financing",
      path: `/applications/${applicationID}/transaction/financing`,
    },
  ];
  return (
    <DashBoardPageLayout
      sortBarData={SortbarData}
      showexport={true}
      exporter={""}
      importer={""}
      date={""}
    >
      {children}
    </DashBoardPageLayout>
  );
}
