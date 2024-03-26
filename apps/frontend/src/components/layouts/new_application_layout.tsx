import ApplicationLeftMenu from "@components/applicationLeftMenu";
import FormEditModal from "@components/modal/entityEditFormModal";
import FormModal from "@components/modal/entityFormModal";
import InvoiceModal from "@components/modal/invoiceModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import StepperModal from "@components/modal/stepperModal";
import Topbar from "@components/topBar";
import NewApplicationTopNav from "@components/topBarNavigation/newApplication";
import useModal from "@hooks/useModal";
import {
  ApplicationModalAtom,
  EditFormModalAtom,
  FinishApplicationForCreditCardModalAtom,
  FinishApplicationModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  SettingsModalAtom,
} from "@store/ModalStore";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: LayoutProps) => {
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  const finishApplicationModal = useModal(FinishApplicationModalAtom);
  const finishApplicationCreditCardModal = useModal(
    FinishApplicationForCreditCardModalAtom
  );

  return (
    <>
      <div>
        <div className="topbarFix">
          <Topbar />
          <NewApplicationTopNav />
        </div>
        <ApplicationLeftMenu />
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
        <StepperModal
          isOpen={finishApplicationModal.isOpen}
          onClose={() => finishApplicationModal.close()}
        ></StepperModal>
        <InvoiceModal
          isOpen={finishApplicationCreditCardModal.isOpen}
          onClose={() => finishApplicationCreditCardModal.close()}
        ></InvoiceModal>
      </div>
    </>
  );
};

export default ApplicationLayout;
