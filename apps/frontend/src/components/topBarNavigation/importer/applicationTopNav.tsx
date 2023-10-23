import useModal from "@hooks/useModal";
import applicationService from "@services/application/applicationService";
import { ApplicationModalAtom } from "@store/ModalStore";
import { currentSelectedEntityAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { EntityCardResponse } from "src/types";
import { Button } from "taral-ui";

type Props = {
  entities: EntityCardResponse[];
};

const ApplicationTopNavRightComponent = ({ entities }: Props) => {
  const [currentSelectedEntity, setCurrentSelectedEntity] = useAtom(
    currentSelectedEntityAtom
  );
  const newApplicationModal = useModal(ApplicationModalAtom);

  const router = useRouter();
  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentSelectedEntity(e.target.value);
            router.replace({
              pathname: `/users/importer/entities/${e.target.value}/overview`,
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
          primary={true}
          backgroundColor="#1ab98b"
          label={"New Application"}
          onClick={() => newApplicationModal.open()}
        ></Button>
      </div>
    </>
  );
};

export default ApplicationTopNavRightComponent;
