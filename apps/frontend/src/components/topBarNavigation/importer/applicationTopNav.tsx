import useModal from "@hooks/useModal";
import applicationService from "@services/application/applicationService";
import {
  ApplicationModalAtom,
  RegisterOnChainModalAtom,
} from "@store/ModalStore";
import { currentSelectedEntityAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { toast } from "sonner";
import { EntityCardResponse } from "src/types";
import { Button } from "@lib";

type Props = {
  entities: EntityCardResponse[];
};

const ApplicationTopNavRightComponent = ({ entities }: Props) => {
  const router = useRouter();
  const entityID = router.asPath.split("/")[4];
  const newApplicationModal = useModal(ApplicationModalAtom);
  const registerOnchainModal = useModal(RegisterOnChainModalAtom);

  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            window.location.replace(
              `/users/importer/entities/${e.target.value}/applications`
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
          primary={true}
          backgroundColor="#1ab98b"
          label={"New Application"}
          onClick={() => {
            // registerOnchainModal.open();
            newApplicationModal.open();
          }}
        ></Button>
      </div>
    </>
  );
};

export default ApplicationTopNavRightComponent;
