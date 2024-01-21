import ApplicationLayout from "@components/layouts/new_application_layout";
import FileUpload, { documentType } from "@components/widgets/FileUpload";
function Index() {
  return (
    <ApplicationLayout>
      <div className="impInfoContainer">
        <div className="atachContainer">
          <div className="upload_container">
            <div className="fileWraper">
              <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
              <span>List of shareholders</span>
            </div>
            <div className="fileWraper">
              <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
              <span>Articles of association</span>
            </div>
            <div className="fileWraper">
              <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
              <span>Interim financial report</span>
            </div>
            <div className="fileWraper">
              <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
              <span>Credit report importer</span>
            </div>
            <div className="fileWraper">
              <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
              <span>Commercial register report</span>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default Index;
