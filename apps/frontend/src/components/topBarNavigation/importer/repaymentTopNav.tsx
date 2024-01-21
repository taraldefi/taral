import { selectedApplicationForRepaymentAtom } from "@store/applicationStore";
import { useAtom } from "jotai";

type Props = {
  applications: any[];
};

const RepaymentTopNavRightComponent = ({ applications }: Props) => {
  const [, setCurrentSelectedApplication] = useAtom(
    selectedApplicationForRepaymentAtom
  );
  return (
    <>
      <div className="viewEntitySelect">
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setCurrentSelectedApplication(e.target.value);
          }}
          name=""
          id=""
          className="inputs"
        >
          {applications &&
            applications.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.applicationNumber}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
};

export default RepaymentTopNavRightComponent;
