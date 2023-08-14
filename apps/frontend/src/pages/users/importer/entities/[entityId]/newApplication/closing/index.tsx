import ApplicationLayout from "@components/layouts/new_application_layout";
import FileUpload from "@components/widgets/FileUpload";
import React from "react";

function Index() {
  return (
    <ApplicationLayout>
      <div className="plContainer">
        <div className="upload_container">
          <div className="fileWraper">
            <FileUpload />
            <span>Exporter&apos;s undertaking</span>
          </div>
          <div className="fileWraper">
            <FileUpload />
            <span>Please upload the SIMAH consent form.</span>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
}

export default Index;
