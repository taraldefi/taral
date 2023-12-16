import React, { use } from "react";
import axios from "axios";
import { Button } from "taral-ui";
import { PortalIcons } from "@components/icons";
import { DisplayThumbnail } from "./pdfThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "./pdfViewer";
import { useNetworks } from "@hooks/useNetwork";

import apiUrls from "@config/apiUrls";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useOpenSignMessage } from "@micro-stacks/react";

export enum documentType {
  CONFIRMATION_DOCUMENT = "confirmation-document",
  ADDITIONAL_DOCUMENT = "additional-document",
}

type FileUploadProps = {
  type: documentType;
};

const FileUpload = ({ type }: FileUploadProps) => {
  const router = useRouter();

  console.log(type);

  const [uploadedFile, setFile] = React.useState<any>(null);
  const { openSignMessage, isRequestPending } = useOpenSignMessage();
  const [uploadStatus, setUploadStatus] = React.useState<any>(false);
  const [isLoading, setLoading] = React.useState(false);
  const [showPdfViewer, setShowPdfViewer] = React.useState(false);
  const { currentStacksNetwork } = useNetworks();

  const applicationID = router.query.applicationId;

  const deleteFile = (_name: any) => {
    setFile(null);
  };

  const fetchUploadStatus = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.TRANSACTION_DOCUMENTS}/${type}/${applicationID}`
      );

      setUploadStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUploadStatus();
  }, []);

  const onSign = async (file: any) => {
    await openSignMessage({
      message: file.name,
      onFinish: async (walletResponse) => {
        console.log("Response", walletResponse);

        const formData = new FormData();
        //onFileUpload(file);
        formData.append("file", file, file.name);
        formData.append("signedMessage", file.name);
        formData.append("signature", walletResponse.signature);
        await axios.post(`${apiUrls.CREATE_FILE}`, formData);

        await axios.post(
          `${apiUrls.TRANSACTION_DOCUMENTS}/${type}/${applicationID}`
        );

        setLoading(false);
        setFile(file);
      },
    });
  };

  React.useEffect(() => {
    fetchUploadStatus();
  }, []);

  const uploadHandler = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      file.url = URL.createObjectURL(file);
      // Prompt User to sign document
      const signatureData = await onSign(file);
      console.log(signatureData);
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      setFile(null);
      // Reset the target value so that user can re upload if he uploads the same file again
      event.target.value = null;
    }
  };

  const UploadedFileCard = () => {
    return (
      <div className="item_container" key={uploadedFile.name}>
        <DisplayThumbnail fileUrl={uploadedFile.url}></DisplayThumbnail>
        <div className="grid">
          <div onClick={() => setShowPdfViewer(true)}>
            <PortalIcons selected={false} icon={"view"}></PortalIcons>
          </div>
          <div>
            <a href={uploadedFile.url} download>
              <PortalIcons selected={false} icon={"download"}></PortalIcons>
            </a>
          </div>
          {isLoading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              fontSize={20}
              className="fa-spin"
            />
          ) : (
            <div
              onClick={() => {
                deleteFile(uploadedFile.name);
              }}
            >
              <PortalIcons selected={false} icon={"delete"}></PortalIcons>
            </div>
          )}
        </div>

        <Modal
          fileName={uploadedFile.name}
          fileUrl={uploadedFile.url}
          shown={showPdfViewer}
          setShown={setShowPdfViewer}
        ></Modal>
      </div>
    );
  };

  const UploadFileCard = () => {
    return (
      <div className="file-card">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            e.preventDefault();
            if (uploadStatus) {
              toast.warning("File already uploaded");
              return;
            }
            uploadHandler(e);
          }}
        />
        <div className="centeredButton">
          {isLoading ? (
            <Button
              backgroundColor="#1ab98b"
              primary={true}
              label={"Uploading"}
              icon={
                <FontAwesomeIcon
                  icon={faSpinner}
                  fontSize={20}
                  className="fa-spin"
                />
              }
              onClick={() => {}}
            ></Button>
          ) : (
            <Button
              backgroundColor={uploadStatus ? "#1e7b60" : "#1ab98b"}
              primary={true}
              label={uploadStatus ? "Uploaded" : "Upload"}
              icon={
                <PortalIcons selected={false} icon={"upload"}></PortalIcons>
              }
              onClick={() => {}}
            ></Button>
          )}
        </div>
      </div>
    );
  };

  return <>{uploadedFile ? <UploadedFileCard /> : <UploadFileCard />}</>;
};

export default FileUpload;
