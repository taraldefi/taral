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
import { ApplicationTable } from "taral-ui";
import { applicationTableDataType } from "taral-ui/build/Table/Table.types";

function Index({ ...props }) {
  const router = useRouter();

  const entityId = props.query.entityId as string;

  const [applicationTableData, setApplicationTableData] = useState<
    applicationTableDataType[]
  >([]);
  const { checkPurchaseOrderHasActiveFinancing, getPurchaseOrderById } =
    useTaralContracts();
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
