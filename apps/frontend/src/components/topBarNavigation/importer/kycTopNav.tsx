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

const KycTopNavRightComponent = ({ entities }: Props) => {
  const router = useRouter();
  const entityID = router.asPath.split("/")[4];
  const formModal = useModal(FormModalAtom);

  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            window.location.replace(
              `/users/importer/entities/${e.target.value}/kyc/generalInfo`
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

export default KycTopNavRightComponent;
