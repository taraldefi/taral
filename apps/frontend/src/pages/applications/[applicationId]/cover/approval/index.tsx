import ReportLayout from "@components/layouts/auditor/cover_layout";
import FileUpload, { documentType } from "@components/widgets/FileUpload";
import { useRouter } from "next/router";
import React from "react";

export default function Approval() {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Approvals",
      path: `/applications/${applicationID}/cover/approval`,
    },
    {
      id: 2,
      title: "Shared Information",
      path: `/applications/${applicationID}/cover/shared`,
    },
  ];
  return (
    <ReportLayout documentCount={1} sortbarData={SortbarData}>
      <div className="main_container">
        <div className="upload_container">
          <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
        </div>
      </div>
    </ReportLayout>
  );
}
