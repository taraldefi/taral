import LeftMenu from "@components/kycLeftMenu";
import React from "react";
import Topbar from "@components/topBar";
import { useModal } from "@utils/hooks";
import {
  ApplicationModalAtom,
  DeleteModalAtom,
  EditFormModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  SettingsModalAtom,
} from "@store/ModalStore";
import { DeleteModal } from "@lib";
import FormModal from "@components/modal/entityFormModal";
import FormEditModal from "@components/modal/entityEditFormModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import SettingsModal from "@components/modal/settingsModal";
import NotificationModal from "@components/modal/notificationModal";
import ImporterTopNav from "@components/topBarNavigation/importer";
interface LayoutProps {
  children: React.ReactNode;
}

const ImporterKycLayout = ({ children }: LayoutProps) => {
  const deleteModal = useModal(DeleteModalAtom);
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  return (
    <>
      <div className="bodyContainer">
        <div className="topbarFix">
          <Topbar />
          <ImporterTopNav />
        </div>
        <div className="mainBody1">
          <LeftMenu></LeftMenu>
          <div className="mainBodyIn">
            <div className="bodyContent">{children}</div>
          </div>
        </div>
      </div>
      <DeleteModal
        title="Delete Entity"
        onDelete={() => {}}
        isOpen={deleteModal.isOpen}
        onClose={() => deleteModal.close()}
      ></DeleteModal>
      <FormModal
        isOpen={newEntityModal.isOpen}
        onClose={() => newEntityModal.close()}
      ></FormModal>
      <FormEditModal
        isOpen={editModal.isOpen}
        onClose={() => editModal.close()}
      ></FormEditModal>
      <NewApplicationModal
        isOpen={applicationModal.isOpen}
        onClose={() => applicationModal.close()}
      ></NewApplicationModal>
      <SettingsModal isOpen={settingsModal.isOpen}></SettingsModal>
      <NotificationModal isOpen={notificationModal.isOpen}></NotificationModal>
    </>
  );
};

export default ImporterKycLayout;
