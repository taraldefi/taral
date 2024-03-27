import useModal from "@hooks/useModal";
import { FormModalAtom } from "@store/ModalStore";
import { currentSelectedEntityAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { EntityCardResponse } from "src/types";
import { Button } from "@lib";

type Props = {
  entities: EntityCardResponse[];
};

const OverviewTopNavRightComponent = ({ entities }: Props) => {
  const formModal = useModal(FormModalAtom);
  const router = useRouter();
  const entityID = router.asPath.split("/")[4];

  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            // router.push(`/users/importer/entities/${e.target.value}/overview`);
            // router.reload();
            window.location.replace(
              `/users/importer/entities/${e.target.value}/overview`
            );
          }}
          name=""
          id=""
          className="inputs"
        >
          {entities &&
            entities.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.id}
                  selected={item.id === entityID}
                >
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <Button
          primary={false}
          label={"New Entity"}
          onClick={() => {
            formModal.open();
          }}
        ></Button>
      </div>
    </>
  );
};

export default OverviewTopNavRightComponent;
