import FormEditModal from "@components/modal/entityEditFormModal";
import FormModal from "@components/modal/entityFormModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import { DeleteModal } from "taral-ui";
import { useModal } from "@utils/hooks";
import React from "react";
import {
  ApplicationModalAtom,
  DeleteModalAtom,
  EditFormModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  SettingsModalAtom,
} from "@store/ModalStore";
import Topbar from "../topBar";
import TopBarNav from "../topBarNavigation";
import SettingsModal from "@components/modal/settingsModal";
import NotificationModal from "@components/modal/notificationModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const deleteModal = useModal(DeleteModalAtom);
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);

  return (
    <div>
      <div className="topbarFix">
        <Topbar />
        <TopBarNav />
      </div>

      {/* {<BottomBar></BottomBar>} */}

      <div className="mainBody">{children}</div>
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
    </div>
  );
};

export default Layout;
