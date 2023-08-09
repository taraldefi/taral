import ReportLayout from "@components/layouts/cover_layout";
import FileUpload from "@components/widgets/FileUpload";
import { useRouter } from "next/router";

export default function Other() {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Credit Reports",
      path: `/applications/${applicationID}/external/credit`,
    },
    {
      id: 2,
      title: "Environment & social",
      path: `/applications/${applicationID}/external/social`,
    },
    {
      id: 3,
      title: "Other Reports",
      path: `/applications/${applicationID}/external/other`,
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
