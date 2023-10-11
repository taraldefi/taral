import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import { NotificationModalAtom, SettingsModalAtom } from "@store/ModalStore";
import { useModal } from "@utils/hooks";
import React from "react";
import Topbar from "../topBar";
import TopBarNav from "../topBarNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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

      <SettingsModal isOpen={settingsModal.isOpen}></SettingsModal>
      <NotificationModal isOpen={notificationModal.isOpen}></NotificationModal>
    </div>
  );
};

export default Layout;
