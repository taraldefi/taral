import FormEditModal from "@components/modal/entityEditFormModal";
import FormModal from "@components/modal/entityFormModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import ImporterTopNav from "@components/topBarNavigation/importer";
import {
  ApplicationModalAtom,
  EditFormModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  RegisterOnChainModalAtom,
  SettingsModalAtom,
} from "@store/ModalStore";
import { useModal } from "@utils/hooks";
import { useRouter } from "next/router";
import React from "react";
import Topbar from "../../topBar";
import { AuthGuard } from "@components/AuthGuard";
import RegisterOnChainModal from "@components/modal/registerOnChainModal";

interface LayoutProps {
  children: React.ReactNode;
}

const ImporterBaseLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  const registerOnchainModal = useModal(RegisterOnChainModalAtom);

  return (
    <>
      <AuthGuard>
        <div>
          <div className="topbarFix">
            <Topbar />
            <ImporterTopNav />
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
          <NotificationModal
            isOpen={notificationModal.isOpen}
          ></NotificationModal>
          <RegisterOnChainModal
            isOpen={registerOnchainModal.isOpen}
            onClose={() => registerOnchainModal.close()}
          ></RegisterOnChainModal>
        </div>
      </AuthGuard>
    </>
  );
};

export default ImporterBaseLayout;
