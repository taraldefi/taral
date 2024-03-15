// import React from "react";

// import FormEditModal from "@components/modal/entityEditFormModal";
// import FormModal from "@components/modal/entityFormModal";
// import NewApplicationModal from "@components/modal/newApplicationModal";
// import { DeleteModal } from "@lib";
// import { useModal } from "@utils/hooks";
// import {
//   ApplicationModalAtom,
//   DeleteModalAtom,
//   EditFormModalAtom,
//   FormModalAtom,
// } from "@store/ModalStore";
// import Topbar from "../components/topBar";
// import TopBarNav from "../components/topBarNavigation";
// interface LayoutProps {
//   children: React.ReactNode;
// }

// const NewLayoutNM = ({ children }: LayoutProps) => {
//   const deleteModal = useModal(DeleteModalAtom);
//   const editModal = useModal(EditFormModalAtom);
//   const applicationModal = useModal(ApplicationModalAtom);
//   const newEntityModal = useModal(FormModalAtom);
//   return (
//     <>
//       <div className="bodyContainer">
//         <div className="topbarFix1">
//           <Topbar />
//           <TopBarNav />
//         </div>
//         <div className="mainBody1">
//           <div className="mainBodyIn">{children}</div>
//         </div>
//       </div>
//       <DeleteModal
//         title="Delete Entity"
//         onDelete={() => {}}
//         isOpen={deleteModal.isOpen}
//         onClose={() => deleteModal.close()}
//       ></DeleteModal>
//       <FormModal
//         isOpen={newEntityModal.isOpen}
//         onClose={() => newEntityModal.close()}
//       ></FormModal>
//       <FormEditModal
//         isOpen={editModal.isOpen}
//         onClose={() => editModal.close()}
//       ></FormEditModal>
//       <NewApplicationModal
//         isOpen={applicationModal.isOpen}
//         onClose={() => applicationModal.close()}
//       ></NewApplicationModal>
//     </>
//   );
// };

// export default NewLayoutNM;
