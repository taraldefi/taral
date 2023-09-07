import Modal from "@components/modal/entityModal";
import { Button, Entity } from "taral-ui";
import FormEditModal from "@components/modal/entityEditFormModal";
import FormModal from "@components/modal/entityFormModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import Topbar from "@components/topBar";
import { DeleteModal } from "taral-ui";
import { useModal } from "@utils/hooks";
import {
  ApplicationModalAtom,
  DeleteModalAtom,
  EditFormModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  SettingsModalAtom,
} from "@store/ModalStore";
import React from "react";

const data = [
  {
    id: "1",
    logo: "/assets/images/entity.png",
    name: "Lange Wiegand GmbH & Co. KG	",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: "2",
    logo: "https://figmage.com/images/Br5KdMfZ_LWxQKCYBNuRq.png",
    name: "Ullrich Weigel OHG mbH",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  ,
  {
    id: "3",
    logo: "https://figmage.com/images/9ca-5Ncq_01BTg1sDOTS6.png",
    name: "Lohmann Kuhn AG	",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  ,
  {
    id: "4",
    logo: "https://figmage.com/images/FcXtuf9MpbZqLQZLQIi_i.png",
    name: "Market Kovačić",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: "5",
    logo: "https://figmage.com/images/Br5KdMfZ_LWxQKCYBNuRq.png",
    name: "Engelbrecht Ltd",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: "6",
    logo: "https://figmage.com/images/qqgzoDF6kdfYFjw81RCW7.png",
    name: "Ullrich Weigel",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: "7",
    logo: "https://figmage.com/images/kjwPXyAc7JYESBaAsvYcl.png",
    name: "Veum Inc",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: "8",
    logo: "https://figmage.com/images/z5o_OyEUvsa9sLodviQ4k.png",
    name: "Kovačić d.o.o.",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: "9",
    logo: "https://figmage.com/images/PaCl_9GDyqUzXDJq-Wtti.png",
    name: "Renaud S.A.",
    abbreviation: "",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
];

function Index() {
  const [searchInput, setSearchInput] = React.useState("");
  const deleteModal = useModal(DeleteModalAtom);
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
  };
  return (
    <div>
      <div className="topbarFix">
        <Topbar />
        <div className="topbarLower">
          <div className="userTabItems">
            <div className="contents"></div>
            <div className="entityContent">
              <div className="entitySearch">
                <input
                  type="text"
                  placeholder="Search by name or number..."
                  className="inputs"
                  onChange={(e) => searchItems(e.target.value)}
                ></input>
              </div>
              <div>
                <Button
                  primary={false}
                  label={"New Entity"}
                  onClick={() => {
                    newEntityModal.open();
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {<BottomBar></BottomBar>} */}
      <div className="mainBody">
        {" "}
        <div className="entityContainer">
          {data
            .filter(function (item) {
              return item!.name.toLowerCase().includes(searchInput);
            })
            .map((item, index) => {
              return (
                <Entity
                  key={index}
                  entityData={item!}
                  modal={<Modal entityID={item!.id}></Modal>}
                ></Entity>
              );
            })}
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
    </div>
  );
}

export default Index;
