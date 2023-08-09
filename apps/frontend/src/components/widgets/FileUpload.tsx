import React from "react";
import axios from "axios";
import { Button } from "taral-ui";
import { PortalIcons } from "@components/icons";
import { DisplayThumbnail } from "./pdfThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "./pdfViewer";

const FileUpload = ({ onFileUpload }: any) => {
  const [uploadedFile, setFile] = React.useState<any>([]);
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [shown, setShown] = React.useState(false);

  const deleteFile = (_name: any) => {
    axios
      .delete(`http://localhost:8080/upload?name=${_name}`)
      .then(() => setFileUploaded(false))
      .catch((err: any) => console.error(err));
  };

  const uploadHandler = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    file.url = URL.createObjectURL(file);
    setFile(file);

    // upload file
    const formData = new FormData();
    onFileUpload(file);
    formData.append("newFile", file, file.name);
    axios
      .post("http://localhost:8080/upload", formData)
      .then(() => {
        file.isUploading = false;
        setFile(file);
        setFileUploaded(true);
      })
      .catch((err) => {
        console.error(err);
        setFileUploaded(false);
      });
  };

  return (
    <>
      {fileUploaded ? (
        <div className="item_container" key={uploadedFile.name}>
          <DisplayThumbnail fileUrl={uploadedFile.url}></DisplayThumbnail>
          <div className="grid">
            <div onClick={() => setShown(true)}>
              <PortalIcons selected={false} icon={"view"}></PortalIcons>
            </div>
            <div>
              <a href={uploadedFile.url} download>
                <PortalIcons selected={false} icon={"download"}></PortalIcons>
              </a>
            </div>
            {uploadedFile.isUploading ? (
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
            shown={shown}
            setShown={setShown}
          ></Modal>
        </div>
      ) : (
        <div className="file-card">
          <input type="file" accept=".pdf" onChange={uploadHandler} />
          <div className="centeredButton">
            {uploadedFile.isUploading ? (
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
      )}
    </>
  );
};

export default FileUpload;
