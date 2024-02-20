import ApplicationLayout from "@components/layouts/new_application_layout";
import FileUpload, { documentType } from "@components/widgets/FileUpload";
import React from "react";

function Index() {
  return (
    <ApplicationLayout>
      <div className="plContainer">
        <div className="upload_container">
          <div className="fileWraper">
            <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
            <span>Exporter&apos;s undertaking</span>
          </div>
          <div className="fileWraper">
            <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
            <span>Please upload the SIMAH consent form.</span>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default Index;
