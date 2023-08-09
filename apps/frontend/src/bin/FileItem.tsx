// import React from "react";
// import { DisplayThumbnail } from "./pdfThumbnail";
// import { PortalIcons } from "@components/icons";
// import Modal from "./pdfViewer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const FileItem = ({ file, deleteFile }: any) => {
//   const [shown, setShown] = React.useState(false);
//   return (
//     <>
//       <div className="item_container" key={file.name}>
//         <DisplayThumbnail
//           fileUrl={file.url}
//           config={{ name: file.name }}
//         ></DisplayThumbnail>
//         <div className="grid">
//           <div onClick={() => setShown(true)}>
//             <PortalIcons selected={false} icon={"view"}></PortalIcons>
//           </div>
//           <div>
//             <a href={file.url} download>
//               <PortalIcons selected={false} icon={"download"}></PortalIcons>
//             </a>
//           </div>
//           {file.isUploading ? (
//             <FontAwesomeIcon
//               icon={faSpinner}
//               fontSize={20}
//               className="fa-spin"
//             />
//           ) : (
//             <div
//               onClick={() => {
//                 deleteFile(file.name);
//               }}
//             >
//               <PortalIcons selected={false} icon={"delete"}></PortalIcons>
//             </div>
//           )}
//         </div>

//         <Modal
//           fileName={file.name}
//           fileUrl={file.url}
//           shown={shown}
//           setShown={setShown}
//         ></Modal>
//       </div>
//     </>
//   );
// };

// export default FileItem;
