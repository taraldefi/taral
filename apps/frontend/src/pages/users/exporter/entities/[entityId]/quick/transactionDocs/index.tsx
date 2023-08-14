import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import FileUpload from "@components/widgets/FileUpload";
import { Button } from "taral-ui";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { exporterQuickApplicationAtom } from "@store/applicationStore";

type FormValues = {
  docs: [];
};

function Index() {
  const { handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const entityID = router.query.entityId;
  const [state, setState] = useAtom(exporterQuickApplicationAtom);
  const [, setFileObject] = React.useState(null);

  const updateAction = (payload: any) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const handleFileUpload = (file: any) => {
    console.log(file);
    setFileObject(file);
  };

  console.log("state:", state);

  const onSubmit = (data: any) => {
    console.log("data:", data);
    updateAction(data);
    router.push(
      `/users/${router.asPath.split("/")[2]}/entities/${entityID}/overview`
    );
  };
  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/security`
    );
  };
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
                <FileUpload onFileUpload={handleFileUpload} />
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
                <FileUpload onFileUpload={handleFileUpload} />
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
      <BottomBar onBack={onBack} onSubmit={handleSubmit(onSubmit)}></BottomBar>
    </ApplicationLayout>
  );
}

export default Index;
