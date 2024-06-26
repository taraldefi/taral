import { PortalIcons } from "@components/icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNetworks } from "@hooks/useNetwork";
import React from "react";
import { Button } from "@lib";
import { DisplayThumbnail } from "./pdfThumbnail";
import Modal from "./pdfViewer";

import { useOpenSignMessage } from "@micro-stacks/react";
import fileService from "@services/fileService";
import { useRouter } from "next/router";
import { toast } from "sonner";
import axios from "axios";
import apiUrls from "@config/apiUrls";

export enum documentType {
  CONFIRMATION_DOCUMENT = "confirmation-document",
  ADDITIONAL_DOCUMENT = "additional-document",
  CREDIT_CARD_STATEMENT = "credit-card-statement",
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
      const response = await fileService.getTransactionDocument(
        type,
        applicationID as string
      );

      setUploadStatus(response);
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
        await fileService.createFile(formData);

        await fileService.markTransactionDocument(
          type,
          applicationID as string
        );
        // const options = {
        //   method: "POST",
        //   url: `${apiUrls.TRANSACTION_DOCUMENTS}/${type}/${applicationID}`,
        //   headers: {
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiMTMiLCJpYXQiOjE3MDMwNDgwNTAsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.yvUps3NMOTucV1rZuUFeguV5r8D6DzNdOeuHgfKHxNM",
        //   },
        // };

        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });

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
