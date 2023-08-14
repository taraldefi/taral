import KYCLayout from "@components/layouts/kycLayout";
import FileUpload from "@components/widgets/FileUpload";

function index() {
  return (
    <KYCLayout>
      <div className="kycContainer">
        <FileUpload></FileUpload>
      </div>
    </KYCLayout>
  );
}

export default index;
