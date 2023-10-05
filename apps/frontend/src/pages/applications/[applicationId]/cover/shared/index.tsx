import ReportLayout from "@components/layouts/auditor/cover_layout";
import FileUpload from "@components/widgets/FileUpload";
import { useRouter } from "next/router";

export default function SharedInfo() {
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
          <FileUpload />
        </div>
      </div>
    </ReportLayout>
  );
}
