import ImporterKycLayout from "@components/layouts/importer/importerKycLayout";
import FileUpload from "@components/widgets/FileUpload";

function index() {
  return (
    <ImporterKycLayout>
      <div className="kycContainer">{/* <FileUpload></FileUpload> */}</div>
    </ImporterKycLayout>
  );
}

export default index;
