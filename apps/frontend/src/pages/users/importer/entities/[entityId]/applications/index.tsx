import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import ClaimButton from "@components/widgets/ClaimButton";
import FinanceButton from "@components/widgets/FinanceButton";
import useTaralContracts from "@hooks/useTaralContracts";
import { useAccount } from "@micro-stacks/react";
import applicationService from "@services/application/applicationService";
import { LENDER_ADDRESS } from "@utils/lib/constants";
import convertDate from "@utils/lib/convertDate";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { useEffect, useState } from "react";
import { ApplicationTable, Button } from "@lib";
import { applicationTableDataType } from "@lib";
import { ArrowRight } from "react-feather";

function Index({ ...props }) {
  const router = useRouter();

  const entityId = props.query.entityId as string;

  const [applicationTableData, setApplicationTableData] = useState<
    applicationTableDataType[]
  >([]);
  const { checkPurchaseOrderHasActiveFinancing, getPurchaseOrderById } =
    useTaralContracts();
  const [activeApplicationId, setActiveApplicationId] = useState<string>("");
  const { stxAddress } = useAccount();

  async function fetchApplicationTableData() {
    try {
      const res = await applicationService.getAllApplications(entityId);
      const applications = res || [];
      console.log(res);
      let applicationTableData: applicationTableDataType[] = [];

      applicationTableData = applications.map(async (application: any) => {
        const claimable = await checkPurchaseOrderHasActiveFinancing(
          application.id
        );
        if (application.status === "ACTIVE") {
          setActiveApplicationId(application.id);
        }

        const purchaseOrder = await getPurchaseOrderById(application.id);

        let alreadyAccepted = false;
        if (purchaseOrder) {
          alreadyAccepted = purchaseOrder["accepted-financing-id"]
            ? true
            : false;
        }
        const userIsLender = stxAddress === LENDER_ADDRESS;

        return {
          id: application.id,
          applicationId: application.id,
          product: "Importer financing",
          dateFrom: convertDate(application.issuanceDate),
          dateTo: convertDate(application.endDate),
          importerName: application.exporterName,
          status: {
            label: application.status.replace("_", " "),
            claimable: (claimable && !alreadyAccepted) || userIsLender,
            component:
              userIsLender && !alreadyAccepted && purchaseOrder ? (
                <FinanceButton applicationId={application.id} />
              ) : claimable && !alreadyAccepted ? (
                <ClaimButton />
              ) : (
                <>--</>
              ),
          },
        };
      });

      setApplicationTableData(await Promise.all(applicationTableData));
    } catch (error) {
      //TODO: Handle error
      console.error("Error fetching entity:", error);
      return {
        props: { ApplicationTable: [], entityId: "" },
      };
    }
  }

  useEffect(() => {
    fetchApplicationTableData();
  }, []);

  console.log(applicationTableData);

  const handleActiveApplicationClick = (id: string) => {
    const currentApplication = applicationTableData.find(
      (application: any) => application.id === id
    );

    if (currentApplication!.status!.label != "ACTIVE") {
      return;
    }
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityId}/quick/${id}/importerInfo`
    );
  };
  return (
    <ImporterBaseLayout>
      <div className="viewbody">
        <div style={{ padding: "10%", width: "100%" }}>
          {activeApplicationId && (
            <div
              style={{
                backgroundColor: "#8cebd0",
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                display: "flex",
                fontSize: "14px",
                color: "#354235",
                gap: "10px",
                alignContent: "center",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                You have a pending active application. Please complete and
                submit the current active application{" "}
              </span>

              <Button
                onClick={() => {
                  handleActiveApplicationClick(activeApplicationId);
                }}
                primary
                backgroundColor="#1ab98b"
                label="Continue application"
                icon={<ArrowRight size={"15"} />}
              ></Button>
            </div>
          )}

          <ApplicationTable
            applicationTableData={applicationTableData}
            onClick={handleActiveApplicationClick}
          ></ApplicationTable>
        </div>
      </div>
    </ImporterBaseLayout>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  {
    const { query } = context;
    return { props: { query } };
  }
};

export default Index;
