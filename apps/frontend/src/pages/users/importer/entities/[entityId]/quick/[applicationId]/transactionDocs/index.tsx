import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import FileUpload, { documentType } from "@components/widgets/FileUpload";
import useTaralContracts from "@hooks/useTaralContracts";
import applicationService from "@services/application/applicationService";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { toast } from "sonner";
import { Button } from "taral-ui";

function Index({ ...props }) {
  const { query } = props;
  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;
  const { createTaralPurchaseOrder } = useTaralContracts();
  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/security`
    );
  };

  const onSubmit = async () => {
    const onChainesponse = await createTaralPurchaseOrder(
      1000,
      200,
      "ST2Y2SFNVZBT8SSZ00XXKH930MCN0RFREB2GQG7CJ"
    );
    console.log(onChainesponse);
    const response = () => applicationService.submitApplication(applicationID);
    toast.promise(response, {
      loading: "Loading...",
      success: () => {
        router.push(
          `/users/${
            router.asPath.split("/")[2]
          }/entities/${entityID}/applications`
        );
        return `Application Submitted Successfully`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
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
                <FileUpload type={documentType.CONFIRMATION_DOCUMENT} />
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
                <FileUpload type={documentType.ADDITIONAL_DOCUMENT} />
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
              <Button label={"Skip for now"} onClick={onSubmit}></Button>
            </div>
          </div>
        </div>
      </div>
      <BottomBar onBack={onBack} onSubmit={onSubmit}></BottomBar>
    </ApplicationLayout>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
