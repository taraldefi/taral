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
import ContentLoader from "react-content-loader";
import { ApplicationTableData } from "src/lib/Table/data/data";

function Index({ ...props }) {
  const router = useRouter();

  const entityId = props.query.entityId as string;

  const [allApplicationTableData, setApplicationTableData] = useState<
    applicationTableDataType[]
  >([]);
  const { checkPurchaseOrderHasActiveFinancing, getPurchaseOrderById } =
    useTaralContracts();
  const [activeApplicationId, setActiveApplicationId] = useState<string>("");
  const { stxAddress } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);

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
        console.log(userIsLender, stxAddress, LENDER_ADDRESS);

        return {
          id: application.id,
          applicationId: application.id,
          product: "Importer financing",
          dateFrom: convertDate(application.issuanceDate),
          dateTo: convertDate(application.endDate),
          importerName: application.exporterName,
          status: {
            label: alreadyAccepted
              ? "LOAN FUNDED"
              : application.status.replace("_", " "),
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
      const data = await Promise.all(applicationTableData);
      console.log("debug 3", data);

      setApplicationTableData(await Promise.all(applicationTableData));
      setLoading(false);
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

  const handleActiveApplicationClick = (id: string) => {
    const currentApplication = allApplicationTableData.find(
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
  const ApplicationLoader = (props: any) => (
    <ContentLoader
      speed={2}
      width={1100}
      height={500}
      viewBox="0 0 1100 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="13" rx="13" ry="13" width="150" height="37" />
      <rect x="205" y="13" rx="13" ry="13" width="122" height="37" />
      <rect x="355" y="13" rx="13" ry="13" width="122" height="37" />
      <rect x="505" y="13" rx="13" ry="13" width="122" height="37" />
      <rect x="655" y="13" rx="13" ry="13" width="122" height="37" />
      <rect x="805" y="13" rx="13" ry="13" width="122" height="37" />
      <rect x="955" y="13" rx="13" ry="13" width="122" height="37" />

      <rect x="0" y="73" rx="13" ry="13" width="1100" height="57" />
      <rect x="0" y="150" rx="13" ry="13" width="1100" height="57" />
    </ContentLoader>
  );

  return (
    <ImporterBaseLayout>
      <div className="viewbody">
        <div style={{ padding: "10%", width: "100%" }}>
          {allApplicationTableData.length > 0 ? (
            <>
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
                applicationTableData={allApplicationTableData}
                onClick={handleActiveApplicationClick}
              ></ApplicationTable>
            </>
          ) : allApplicationTableData.length == 0 && !loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "20px",
                color: "gray",
              }}
            >
              No applications found under this entity
            </div>
          ) : (
            <ApplicationLoader />
          )}
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
