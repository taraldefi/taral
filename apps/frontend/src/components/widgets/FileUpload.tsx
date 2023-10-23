import React from "react";
import axios from "axios";
import { Button } from "taral-ui";
import { PortalIcons } from "@components/icons";
import { DisplayThumbnail } from "./pdfThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "./pdfViewer";
import { useNetworks } from "@hooks/useNetwork";

import { signData } from "@utils/lib/signData";

const FileUpload = ({ onFileUpload }: any) => {
  const [uploadedFile, setFile] = React.useState<any>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [showPdfViewer, setShowPdfViewer] = React.useState(false);
  const { currentStacksNetwork } = useNetworks();

  const deleteFile = (_name: any) => {
    axios
      .delete(`http://localhost:8080/upload?name=${_name}`)
      .then(() => setFile(null))
      .catch((err: any) => console.error(err));
  };

  const uploadHandler = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      file.url = URL.createObjectURL(file);
      // Prompt User to sign document
      const signatureData = await signData(file.name, currentStacksNetwork);
      console.log(signatureData);
      const formData = new FormData();
      onFileUpload(file);
      formData.append("file", file, file.name);
      formData.append("signedMessage", file.name);
      formData.append("signature", signatureData.signature);
      await axios.post("http://localhost:8080/upload", formData);
      setLoading(false);
      setFile(file);
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
        <input type="file" accept=".pdf" onChange={(e) => uploadHandler(e)} />
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
              backgroundColor="#1ab98b"
              primary={true}
              label={"Upload"}
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
