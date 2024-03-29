import { PortalIcons } from "@components/icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "@utils/hooks";
import router from "next/router";
import React from "react";
import { DeleteModalAtom, EditFormModalAtom } from "@store/ModalStore";
import { useAtom } from "jotai";
import { currentSelectedEntityAtom } from "@store/entityStore";

interface ModalProps {
  entityID: any;
}

function Modal({ entityID }: ModalProps) {
  const [modal, setModal] = React.useState(false);
  const editModal = useModal(EditFormModalAtom);
  const deleteModal = useModal(DeleteModalAtom);
  const [, setCurrentSelectedEntity] = useAtom(currentSelectedEntityAtom);

  return (
    <div className={"modal"} onClick={() => setModal(!modal)}>
      <div className={"iconEntityOption " + (modal && "active")}>
        <FontAwesomeIcon
          icon={faEllipsis}
          className="iconx"
          fontSize={18}
          color="#0D8489"
        ></FontAwesomeIcon>
      </div>
      <div className={"modalContainer " + (modal && "active")}>
        {modal && (
          <div className="modalMenue">
            <div
              className="modalViewButton"
              onClick={() => {
                setCurrentSelectedEntity(entityID);
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/overview`
                );
              }}
            >
              <PortalIcons selected={false} icon={"eye"}></PortalIcons>
              <span>View</span>
            </div>
            <div onClick={() => editModal.open(entityID)}>
              <PortalIcons selected={false} icon={"pen"}></PortalIcons>
              <span>Edit</span>
            </div>
            <span></span>
            <div onClick={() => deleteModal.open(entityID)}>
              <PortalIcons selected={false} icon={"delete"}></PortalIcons>
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
