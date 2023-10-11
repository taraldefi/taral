import FormEditModal from "@components/modal/entityEditFormModal";
import FormModal from "@components/modal/entityFormModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import ExporterTopNav from "@components/topBarNavigation/exporter";
import {
  ApplicationModalAtom,
  EditFormModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  SettingsModalAtom,
} from "@store/ModalStore";
import { useModal } from "@utils/hooks";
import React from "react";
import Topbar from "../../topBar";

interface LayoutProps {
  children: React.ReactNode;
}

const ExporterBaseLayout = ({ children }: LayoutProps) => {
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);

  return (
    <div>
      <div className="topbarFix">
        <Topbar />
        <ExporterTopNav />
      </div>

      {/* {<BottomBar></BottomBar>} */}

      <div className="mainBody">{children}</div>

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

export default ExporterBaseLayout;
