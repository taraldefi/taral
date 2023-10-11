import useModal from "@hooks/useModal";
import { FormModalAtom } from "@store/ModalStore";
import { currentSelectedEntityAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { EntityCardResponse } from "src/types";
import { Button } from "taral-ui";

type Props = {
  entities: EntityCardResponse[];
};

const OverviewTopNavRightComponent = ({ entities }: Props) => {
  const [currentSelectedEntity, setCurrentSelectedEntity] = useAtom(
    currentSelectedEntityAtom
  );
  const formModal = useModal(FormModalAtom);

  const router = useRouter();

  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentSelectedEntity(e.target.value);
            router.replace({
              pathname: `/users/exporter/entities/${e.target.value}/overview`,
            });
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
                  selected={item.id === currentSelectedEntity}
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
