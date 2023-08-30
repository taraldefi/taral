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
import React, { useEffect, useState } from "react";
import entityService from "@services/entityService";
import {
  EntitiesAtom,
  EntityCreatedAtom,
  EntityDeletedAtom,
  EntityEditedAtom,
} from "@store/entityStore";
import { useAtom } from "jotai";
import { getBase64Src } from "@utils/lib/getBase64";
import ContentLoader from "react-content-loader";

// const data = [
//   {
//     id: "2870525b-36dc-4da3-9318-d96c2c7adb1f",
//     image: "/assets/images/entity.png",
//     title: "Lange Wiegand GmbH & Co. KG	",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   {
//     id: 2,
//     image: "https://figmage.com/images/Br5KdMfZ_LWxQKCYBNuRq.png",
//     title: "Ullrich Weigel OHG mbH",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   ,
//   {
//     id: 3,
//     image: "https://figmage.com/images/9ca-5Ncq_01BTg1sDOTS6.png",
//     title: "Lohmann Kuhn AG	",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   ,
//   {
//     id: 4,
//     image: "https://figmage.com/images/FcXtuf9MpbZqLQZLQIi_i.png",
//     title: "Market Kovačić",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   {
//     id: 5,
//     image: "https://figmage.com/images/Br5KdMfZ_LWxQKCYBNuRq.png",
//     title: "Engelbrecht Ltd",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   {
//     id: 6,
//     image: "https://figmage.com/images/qqgzoDF6kdfYFjw81RCW7.png",
//     title: "Ullrich Weigel",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   {
//     id: 7,
//     image: "https://figmage.com/images/kjwPXyAc7JYESBaAsvYcl.png",
//     title: "Veum Inc",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   {
//     id: 8,
//     image: "https://figmage.com/images/z5o_OyEUvsa9sLodviQ4k.png",
//     title: "Kovačić d.o.o.",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
//   {
//     id: 9,
//     image: "https://figmage.com/images/PaCl_9GDyqUzXDJq-Wtti.png",
//     title: "Renaud S.A.",
//     registrationNo: 1,
//     products: 25,
//     applications: 25,
//   },
// ];

function Index() {
  const [searchInput, setSearchInput] = useState("");
  const deleteModal = useModal(DeleteModalAtom);
  const editModal = useModal(EditFormModalAtom);
  const applicationModal = useModal(ApplicationModalAtom);
  const newEntityModal = useModal(FormModalAtom);
  const settingsModal = useModal(SettingsModalAtom);
  const notificationModal = useModal(NotificationModalAtom);
  const [entityEdited] = useAtom(EntityEditedAtom);
  const [entityDeleted, setEntityDeleted] = useAtom(EntityDeletedAtom);
  const [entityCreated] = useAtom(EntityCreatedAtom);
  const [isLoading, setLoading] = useState(false);

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
  };
  const [entities, setEntities] = useAtom(EntitiesAtom);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await entityService.getAllEntity();
        setEntities(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    }

    fetchData();
  }, [entityEdited, entityDeleted, entityCreated]);
  async function fetchEntityLogo(id: string): Promise<string> {
    let srcImg = "";
    try {
      const res = await entityService.getEntityLogo(id);
      srcImg = getBase64Src(res);
      console.log(srcImg);
    } catch (error) {
      console.error("Error fetching entity:", error);
    }
    return srcImg;
  }
  const handleDelete = async (entityIdToDelete: string) => {
    try {
      await entityService.deleteEntity(entityIdToDelete).then(() => {
        // Update the state to remove the deleted entity
        setEntities((prevEntities: any) =>
          prevEntities.filter((entity: any) => entity.id !== entityIdToDelete)
        );
        setEntityDeleted(entityIdToDelete);
        deleteModal.close();
      });
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };
  const MyLoader = (props: any) => (
    <div style={{ marginTop: "75px" }}>
      <ContentLoader
        speed={2}
        width={350}
        height={150}
        viewBox="0 0 350 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="83" y="7" rx="3" ry="3" width="192" height="13" />
        <rect x="87" y="29" rx="3" ry="3" width="52" height="6" />
        <rect x="11" y="249" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="170" rx="3" ry="3" width="380" height="6" />
        <rect x="5" y="189" rx="3" ry="3" width="178" height="6" />
        <circle cx="29" cy="29" r="29" />
        <rect x="7" y="76" rx="0" ry="0" width="326" height="6" />
        <rect x="7" y="97" rx="0" ry="0" width="125" height="6" />
        <rect x="7" y="113" rx="3" ry="3" width="52" height="6" />
        <rect x="145" y="97" rx="0" ry="0" width="125" height="6" />
        <rect x="145" y="113" rx="3" ry="3" width="52" height="6" />
      </ContentLoader>
    </div>
  );
  const EntityBody = () => {
    return (
      <div className="entityContainer">
        {!isLoading
          ? entities
              .filter(function (item) {
                return item!.name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase());
              })
              .map((item, index) => {
                return (
                  <Entity
                    fetchLogo={fetchEntityLogo}
                    key={index}
                    entityData={item!}
                    modal={<Modal entityID={item!.id}></Modal>}
                  ></Entity>
                );
              })
          : [1, 2, 3].map((index) => {
              return <MyLoader key={index}></MyLoader>;
            })}
      </div>
    );
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
        {entities.length ? (
          <EntityBody></EntityBody>
        ) : (
          <div className="entityContainer">no entities registered</div>
        )}
      </div>
      <DeleteModal
        title="Delete Entity"
        onDelete={async () => {
          if (deleteModal.entityId) handleDelete(deleteModal.entityId);
        }}
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
