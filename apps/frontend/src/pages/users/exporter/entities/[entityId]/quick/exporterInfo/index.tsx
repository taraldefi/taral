import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { exporterQuickApplicationAtom } from "@store/applicationStore";

type FormValues = {
  exporterInfo: {
    companyName: string;
    phoneNo: string;
    address: string;
    postalCode: string;
    totalRevenue: string;
    revenuePercentage: string;
  };
};

function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const entityID = router.query.entityId;
  const [state, setState] = useAtom(exporterQuickApplicationAtom);

  const updateAction = (payload: any) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  console.log("state:", state);

  const onSubmit = (data: any) => {
    console.log("data:", data);
    updateAction(data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/importerInfo`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${router.asPath.split("/")[2]}/entities/${entityID}/applications`
    );
  };

  return (
    <div>
      <ApplicationLayout>
        <div className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div>
              <span>What is your company name?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
                defaultValue={state.exporterInfo.companyName}
                {...register("exporterInfo.companyName", { required: true })}
              />
            </div>
            <div>
              <span>Phone Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
                defaultValue={state.exporterInfo.phoneNo}
                {...register("exporterInfo.phoneNo", { required: true })}
              />
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
                defaultValue={state.exporterInfo.address}
                {...register("exporterInfo.address", { required: true })}
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
                defaultValue={state.exporterInfo.postalCode}
                {...register("exporterInfo.postalCode", { required: true })}
              />
            </div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">TAX AND REVENUE</div>
            <div>
              <span>Total revenue last fiscal year?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue amount..."
                defaultValue={state.exporterInfo.totalRevenue}
                {...register("exporterInfo.totalRevenue", { required: true })}
              />
            </div>
            <div>
              <span>What % of revenue was comprised by exports?</span>
              <input
                type="text"
                className="inputs"
                placeholder="Revenue percentage..."
                id="percentage"
                defaultValue={state.exporterInfo.revenuePercentage}
                {...register("exporterInfo.revenuePercentage", {
                  required: true,
                })}
              />
            </div>
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>
          <div className="vLine0"></div>
          <div className="otherInfo"></div>
        </div>
        <BottomBar
          onBack={onBack}
          onSubmit={handleSubmit(onSubmit)}
        ></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
