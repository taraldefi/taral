import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import Topbar from "@components/topBar";
import useModal from "@hooks/useModal";
import { Button, ProfileAddressCard, ProfilePersonalCard } from "taral-ui";
import Image from "next/image";
import { NotificationModalAtom, SettingsModalAtom } from "@store/ModalStore";

function Profile() {
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  return (
    <>
      <div className="profilePage">
        <div className="topbarFix">
          <Topbar />
        </div>
        <div className="content">
          <div className="profileCard">
            <div className="userContainer">
              <Image
                className="images"
                src="/assets/images/avatar.png"
                alt=""
                width={100}
                height={100}
              ></Image>
              <div className="flexBox">
                <span>Profile Name</span>
                <span>Timezone +6</span>
              </div>
              <div className="lastItem">
                <Button onClick={() => {}} label={"Edit Info"}></Button>
              </div>
            </div>
          </div>
          <div className="profilePageCardContainer">
            <ProfilePersonalCard
              firstName={"John"}
              lastName={"Doe"}
              email={"john@gmail.com"}
              phone={"+1 555 678 9012"}
            />
            <ProfileAddressCard
              country={"United Kingdom"}
              city={"Leeds,ast London"}
              postCode={"ERT 2354"}
              taxId={"As45645756"}
            />
          </div>
        </div>
      </div>
      <SettingsModal isOpen={settingsModal.isOpen}></SettingsModal>
      <NotificationModal isOpen={notificationModal.isOpen}></NotificationModal>
    </>
  );
}

export default Profile;
