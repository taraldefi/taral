import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import applicationService from "@services/application/applicationService";
import convertDate from "@utils/lib/convertDate";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { ApplicationTable } from "taral-ui";
import { applicationTableDataType } from "taral-ui/build/Table/Table.types";

const TableData = [
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "SX-936",
    importerName: "Ullrich Weigel OH GmbH",
    status: "Pending",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "SX-936",
    importerName: "Ullrich Weigel OH GmbH",
    status: "Pending",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "SX-936",
    importerName: "Ullrich Weigel OH GmbH",
    status: "Pending",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "SX-936",
    importerName: "Ullrich Weigel OH GmbH",
    status: "Pending",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
  {
    applicationId: 262116,
    product: "Product Title",
    dateFrom: "12.01.2022",
    dateTo: "12.02.2022",
    importerId: "FH-509",
    importerName: "Lohmann Kuhn AG",
    status: "Reviewing",
  },
];
function Index({ ...props }) {
  const router = useRouter();

  const handleActiveApplicationClick = (id: number) => {
    const currentApplication = props.applicationTableData.find(
      (application: any) => application.applicationId === id
    );
    if (currentApplication.status != "ACTIVE") {
      return;
    }
    router.push(
      `/users/${router.asPath.split("/")[2]}/entities/${
        props.entityId
      }/quick/${id}/importerInfo`
    );
  };
  return (
    <ImporterBaseLayout>
      <div className="viewbody">
        <div style={{ padding: "10%", width: "100%" }}>
          <ApplicationTable
            applicationTableData={props.applicationTableData}
            onClick={handleActiveApplicationClick}
          ></ApplicationTable>
        </div>
      </div>
    </ImporterBaseLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  try {
    const res = await applicationService.getAllApplications(
      query.entityId as string
    );
    const applications = res || [];
    let applicationTableData: applicationTableDataType[] = [];
    applicationTableData = applications.map((application: any) => {
      return {
        applicationId: application.id,
        product: "--",
        dateFrom: convertDate(application.issuanceDate),
        dateTo: "--",
        importerId: "FH-509",
        importerName: "--",
        status: application.status,
      };
    });

    return {
      props: { applicationTableData, entityId: query.entityId },
    };
  } catch (error) {
    //TODO: Handle error
    console.error("Error fetching entity:", error);
    return {
      props: { ApplicationTable: [], entityId: "" },
    };
  }
}

export default Index;
