import ExporterKycLayout from "@components/layouts/exporter/exporterKycLayout";
import FileUpload from "@components/widgets/FileUpload";

function index() {
  return (
    <ExporterKycLayout>
      <div className="kycContainer">
        <FileUpload></FileUpload>
      </div>
    </ExporterKycLayout>
  );
}

export default index;
