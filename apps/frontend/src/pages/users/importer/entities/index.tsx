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
    id: 1,
    image: "/assets/images/entity.png",
    title: "Lange Wiegand GmbH & Co. KG	",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: 2,
    image: "https://figmage.com/images/Br5KdMfZ_LWxQKCYBNuRq.png",
    title: "Ullrich Weigel OHG mbH",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  ,
  {
    id: 3,
    image: "https://figmage.com/images/9ca-5Ncq_01BTg1sDOTS6.png",
    title: "Lohmann Kuhn AG	",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  ,
  {
    id: 4,
    image: "https://figmage.com/images/FcXtuf9MpbZqLQZLQIi_i.png",
    title: "Market Kovačić",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: 5,
    image: "https://figmage.com/images/Br5KdMfZ_LWxQKCYBNuRq.png",
    title: "Engelbrecht Ltd",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: 6,
    image: "https://figmage.com/images/qqgzoDF6kdfYFjw81RCW7.png",
    title: "Ullrich Weigel",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: 7,
    image: "https://figmage.com/images/kjwPXyAc7JYESBaAsvYcl.png",
    title: "Veum Inc",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: 8,
    image: "https://figmage.com/images/z5o_OyEUvsa9sLodviQ4k.png",
    title: "Kovačić d.o.o.",
    registrationNo: 1,
    products: 25,
    applications: 25,
  },
  {
    id: 9,
    image: "https://figmage.com/images/PaCl_9GDyqUzXDJq-Wtti.png",
    title: "Renaud S.A.",
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
              return item!.title.toLowerCase().includes(searchInput);
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
