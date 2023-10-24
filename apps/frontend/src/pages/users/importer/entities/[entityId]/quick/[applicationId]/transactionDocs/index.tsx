import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import FileUpload from "@components/widgets/FileUpload";
import { Button } from "taral-ui";

function Index() {
  return (
    <ApplicationLayout>
      <div className="txDocContainer">
        <div className="txDocItemsContainer">
          <div className="txDocDetails">
            <div className="maintitle">TRANSACTION DOCS</div>
            <div className="upload_container">
              <div
                style={{
                  textAlign: "center",
                  gap: "10px",
                  fontWeight: "600",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FileUpload />
                <span>Confirmation Document</span>
              </div>

              <div
                style={{
                  textAlign: "center",
                  gap: "10px",
                  fontWeight: "600",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FileUpload />
                <span>Additional Documents</span>
              </div>
            </div>
          </div>
          <div className="vLine"></div>
          <div className="txDocInterest">
            <div className="maintitle">
              Please upload a copy of the document that proves that the
              transaction was completed successfully.
            </div>
            <div className="maintitle">
              If the transaction is not yet completed, you can skip this step
              for now.
            </div>
            <div className="btnContainer">
              <Button label={"Skip for now"} onClick={() => {}}></Button>
            </div>
          </div>
        </div>
      </div>
      {/* <BottomBar></BottomBar> */}
    </ApplicationLayout>
  );
}

export default Index;
