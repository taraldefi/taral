import Modal from "@components/modal/entityModal";
import { Button, Entity } from "@lib";

import FormEditModal from "@components/modal/entityEditFormModal";
import FormModal from "@components/modal/entityFormModal";
import NewApplicationModal from "@components/modal/newApplicationModal";
import NotificationModal from "@components/modal/notificationModal";
import SettingsModal from "@components/modal/settingsModal";
import Topbar from "@components/topBar";
import { DeleteModal } from "@lib";
import { useModal } from "@utils/hooks";
import {
  ApplicationModalAtom,
  DeleteModalAtom,
  EditFormModalAtom,
  FormModalAtom,
  NotificationModalAtom,
  SettingsModalAtom,
  selectedEntityModalAtom,
} from "@store/ModalStore";
import React, { useEffect, useState } from "react";
import entityService from "@services/entityService";
import {
  EntityCreatedAtom,
  EntityDeletedAtom,
  EntityEditedAtom,
} from "@store/entityStore";
import { useAtom } from "jotai";
import fetchEntityLogo from "@utils/lib/fetchEntityLogo";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { EntityCardResponse } from "src/types";
import { AuthGuard } from "@components/AuthGuard";
import IdleTimeOutHandler from "@components/idleTimeOutHandler";

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
  const [, setSelectedEntity] = useAtom(selectedEntityModalAtom);
  const router = useRouter();

  const [entities, setEntities] = useState<EntityCardResponse[]>([]);

  async function fetchEntities() {
    try {
      const res = await entityService.getAllEntity();
      const entities = res || [];
      setEntities(entities);
    } catch (error) {
      console.log("Error fetching entities:", error);
    }
  }

  useEffect(() => {
    fetchEntities();
  }, [entityCreated, entityEdited, entityDeleted]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
  };

  useEffect(() => {
    refreshData();
  }, [entityEdited, entityDeleted, entityCreated]);

  const handleDelete = async (entityIdToDelete: string) => {
    const response = () => entityService.deleteEntity(entityIdToDelete);
    toast.promise(response, {
      loading: "Loading...",
      success: () => {
        // Update the state to remove the deleted entity
        setEntityDeleted(entityIdToDelete);
        // Clear the modal entity ID state so that the Modal components doesn't fetch a deleted entity
        setSelectedEntity("");
        deleteModal.close();
        return `entity deleted`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });
  };

  const EntityBody = () => {
    return (
      <div className="entityContainer">
        {entities
          .filter(function (item: any) {
            return item!.name.toLowerCase().includes(searchInput.toLowerCase());
          })
          .map((item: any, index: any) => {
            return (
              <Entity
                onClickViewApplications={() => {
                  router.push(`${router.asPath}/${item.id}/applications`);
                }}
                fetchLogo={fetchEntityLogo}
                key={index}
                entityData={item!}
                modal={<Modal entityID={item!.id}></Modal>}
              ></Entity>
            );
          })}
      </div>
    );
  };
  return (
    <>
      <AuthGuard>
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
              <div
                style={{
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "24px",
                  fontWeight: "400",
                }}
              >
                <div>No entities registered</div>
              </div>
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
          <NotificationModal
            isOpen={notificationModal.isOpen}
          ></NotificationModal>
        </div>
      </AuthGuard>
    </>
  );
}
// export async function getServerSideProps() {
//   try {
//     const res = await entityService.getAllEntity();
//     const entities = res || [];
//     console.log("entities", entities);

//     return {
//       props: { entities },
//     };
//   } catch (error) {
//     //TODO: Handle error
//     console.error("Error fetching entity:", error);
//     return {
//       props: { entities: [] },
//     };
//   }
// }

export default Index;
