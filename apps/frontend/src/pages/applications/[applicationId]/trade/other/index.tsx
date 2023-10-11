import ReportLayout from "@components/layouts/auditor/cover_layout";
import FileUpload from "@components/widgets/FileUpload";
import { useRouter } from "next/router";
import React from "react";

export default function Other() {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Contract",
      path: `/applications/${applicationID}/trade/contract`,
    },
    {
      id: 2,
      title: "Shipping Documents",
      path: `/applications/${applicationID}/trade/shipping`,
    },
    {
      id: 3,
      title: "Acceptance Certificates",
      path: `/applications/${applicationID}/trade/acceptance`,
    },
    {
      id: 4,
      title: "Other Documents",
      path: `/applications/${applicationID}/trade/other`,
    },
  ];
  return (
    <ReportLayout documentCount={1} sortbarData={SortbarData}>
      <div className="main_container">
        <div className="upload_container">
          <FileUpload />
        </div>
      </div>
    </ReportLayout>
  );
}
