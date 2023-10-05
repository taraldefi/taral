import ComplianceLayout from "@components/layouts/auditor/compliance_layout";
import FileUpload from "@components/widgets/FileUpload";
function Company() {
  return (
    <ComplianceLayout showexport={true}>
      <div className="main_container">
        <div className="upload_container">
          <FileUpload />
        </div>
      </div>
    </ComplianceLayout>
  );
}

export default Company;
