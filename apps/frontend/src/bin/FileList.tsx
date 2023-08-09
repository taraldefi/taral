// import axios from "axios";
// import React from "react";
// import FileItem from "./FileItem";

// const FileList = ({ files, removeFile }: any) => {
//   const deleteFileHandler = (_name: any) => {
//     axios
//       .delete(`http://localhost:8080/upload?name=${_name}`)
//       .then(() => removeFile(_name))
//       .catch((err: any) => console.error(err));
//   };
//   return (
//     <>
//       <div className="upload_container">
//         {files &&
//           files.map((f: { name: any }) => (
//             <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
//           ))}
//       </div>
//     </>
//   );
// };

// export default FileList;
