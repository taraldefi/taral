// import React from "react";
// import { useRouter } from "next/router";
// import { TopbarData, TopbarNewDataEx, TopbarNewDataIm } from "./data";
// import { Button } from "taral-ui";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { useAtom } from "jotai";
// import { pageIndexAtom } from "store/PageIndexStore";
// import { useModal } from "@utils/hooks";
// import { ApplicationModalAtom, FormModalAtom } from "store/ModalStore";

// function ImporterTopBarNav() {
//   const routesStrings = ["exporter", "newApplication", "quick", "applications"];
//   const [index, setIndex] = useAtom(pageIndexAtom);
//   const formModal = useModal(FormModalAtom);
//   const newApplicationModal = useModal(ApplicationModalAtom);
//   const handleClick1 = (e: any) => {
//     setIndex(0);
//     router.push(`/users/${router.asPath.split("/")[2]}`);
//   };
//   const router = useRouter();

//   const matchPath1 = (item: any) => {
//     const currentRoute = router.asPath.split("/")[3];
//     console.log(currentRoute);

//     if (currentRoute === item.name.toLowerCase()) {
//       return true;
//     } else if (item.name.toLowerCase() == "view" && router.asPath == "/") {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   const matchPath = (item: any) => {
//     const currentRoute = router.asPath.split("/")[1];
//     console.log(currentRoute);

//     if (currentRoute === item.name.toLowerCase()) {
//       return true;
//     } else if (
//       item.name.toLowerCase() == "applications" &&
//       router.asPath == "/"
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   console.log(router.asPath);
//   const matchPathNewApp = () => {
//     const currentPath = router.asPath.split("/")[3];
//     if (currentPath === "newApplication" || currentPath === "quick") {
//       return true;
//     }
//   };
//   return (
//     <>
//       <div className="topbarLower">
//         {matchPathNewApp() ? (
//           <>
//             <div className="newAppBackContainer">
//               <div onClick={handleClick1}>
//                 <FontAwesomeIcon
//                   icon={faArrowLeft}
//                   fontSize="24px"
//                   color="#003C6E"
//                 />
//               </div>
//               <span>New Application</span>
//             </div>
//           </>
//         ) : (
//           <></>
//         )}
//         {
//           //Overview,kyc etc top bar
//           router.asPath.split("/")[1] == "users" &&
//           router.asPath.split("/")[3] != "newApplication" &&
//           router.asPath.split("/")[3] != "quick" ? (
//             <div className="userTabItems">
//               <div className="contents">
//                 {router.asPath.split("/")[2] == "exporter"
//                   ? TopbarNewDataEx.map((item, index) => {
//                       return (
//                         <div
//                           onClick={(e) => {
//                             e.preventDefault();
//                             router.push(item.path);
//                           }}
//                           key={index}
//                         >
//                           <span
//                             className={
//                               matchPath1(item) ? "content selected" : "content"
//                             }
//                           >
//                             {item.title}
//                           </span>
//                         </div>
//                       );
//                     })
//                   : TopbarNewDataIm.map((item, index) => {
//                       return (
//                         <div
//                           onClick={(e) => {
//                             e.preventDefault();
//                             router.push(item.path);
//                           }}
//                           key={index}
//                         >
//                           <span
//                             className={
//                               matchPath1(item) ? "content selected" : "content"
//                             }
//                           >
//                             {item.title}
//                           </span>
//                         </div>
//                       );
//                     })}
//               </div>
//               <div className="entityContent">
//                 {router.asPath == "/users/exporter" || "/users/importer" ? (
//                   <div className="entitySearch">
//                     <input
//                       type="text"
//                       placeholder="Search by name or number..."
//                       className="inputs"
//                     ></input>
//                   </div>
//                 ) : (
//                   <div className="viewEntitySelect">
//                     <select name="" id="" className="inputs">
//                       <option value="">Entity Name</option>
//                     </select>
//                   </div>
//                 )}
//                 <div>
//                   <Button
//                     primary={false}
//                     label={"New Entity"}
//                     onClick={() => {
//                       console.log("debug 1:", open);
//                       formModal.open();
//                     }}
//                   ></Button>
//                 </div>

//                 <div>
//                   <Button
//                     primary={true}
//                     backgroundColor="#1ab98b"
//                     label={"New Application"}
//                     onClick={() => newApplicationModal.open()}
//                   ></Button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             //old application top bar
//             router.asPath.split("/")[1] == "applications" && (
//               <div className="contents">
//                 {TopbarData.map((item, index) => {
//                   return (
//                     <div
//                       onClick={(e) => {
//                         e.preventDefault();
//                         router.push(item.path);
//                       }}
//                       key={index}
//                     >
//                       <span
//                         className={
//                           matchPath(item) ? "content selected" : "content"
//                         }
//                       >
//                         {item.title}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )
//           )
//         }
//       </div>
//     </>
//   );
// }

// export default ImporterTopBarNav;
