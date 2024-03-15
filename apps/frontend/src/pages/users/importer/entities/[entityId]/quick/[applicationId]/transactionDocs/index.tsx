import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import FileUpload, { documentType } from "@components/widgets/FileUpload";
import useModal from "@hooks/useModal";
import { useAuth } from "@micro-stacks/react";
import applicationService from "@services/application/applicationService";
import {
  FinishApplicationForCreditCardModalAtom,
  FinishApplicationModalAtom,
} from "@store/ModalStore";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { toast } from "sonner";
import { Button } from "@lib";

function Index({ ...props }) {
  const { query } = props;
  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;
  const finishModal = useModal(FinishApplicationModalAtom);
  const finishModalForCreditCard = useModal(
    FinishApplicationForCreditCardModalAtom
  );
  const { isSignedIn } = useAuth();

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/security`
    );
  };

  const onSubmit = async () => {
    const result = await applicationService.getApplication(applicationID);

    if (result.paymentMethod === "CREDIT_CARD") {
      finishModalForCreditCard.open();
    } else {
      if (!isSignedIn) {
        toast.error("Please connect your wallet to continue");
        return;
      }
      finishModal.open();
    }
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
