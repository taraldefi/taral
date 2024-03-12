import { PortalIcons } from "@components/icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTaralContracts from "@hooks/useTaralContracts";
import applicationService from "@services/application/applicationService";
import { useTransaction } from "@utils/queries/use-transaction";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SVGComponent from "./loading";
import { getExplorerLink } from "@utils/helper";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function InvoiceModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  const entityId = router.query.entityId as string;
  const applicationId = router.query.applicationId as string;

  const handleFinalSubmission = async () => {
    const application = await applicationService.getApplication(applicationId);

    const offChainResponse = applicationService.submitApplicationForCreditCard(
      applicationId,
      application.buyerInformation.companyName,
      application.buyerInformation.id
    );

    toast.promise(offChainResponse, {
      loading: "Loading...",
      success: (data) => {
        router.push(
          `/users/${
            router.asPath.split("/")[2]
          }/entities/${entityId}/applications`
        );

        return `Application submitted and is on review`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
  };

  return (
    <div className={"finishApplicationModal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modalMenue">
          <div
            onClick={() => {
              onClose();
            }}
            className="close"
          >
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </div>

          <div className="form">
            <div>
              <div className="svgContainer">
                <Image
                  src="/assets/images/invoice.gif"
                  alt="invoice"
                  width={200}
                  height={150}
                ></Image>
              </div>
              <br />
              <div className="header-application">Submit Application</div>
              <div style={{ fontSize: "13px" }} className="info-application">
                Once you click Submit, please check your email for the payment
                invoice.
              </div>
              <br />
              <div className="buttonContainer">
                <button onClick={() => handleFinalSubmission()} className="btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceModal;
