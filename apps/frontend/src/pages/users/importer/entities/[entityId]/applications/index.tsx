import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import applicationService from "@services/application/applicationService";
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

  async function fetchApplicationTableData() {
    try {
      const res = await applicationService.getAllApplications(entityId);
      const applications = res || [];
      let applicationTableData: applicationTableDataType[] = [];

      applicationTableData = applications.map((application: any) => {
        return {
          id: application.id,
          applicationId: application.applicationNumber,
          product: "Importer financing",
          dateFrom: convertDate(application.issuanceDate),
          dateTo: convertDate(application.endDate),
          importerName: application.exporterName,
          status: application.status,
        };
      });

      setApplicationTableData(applicationTableData);
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
    const currentApplication = applicationTableData.find(
      (application: any) => application.id === id
    );

    if (currentApplication!.status != "ACTIVE") {
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

// export async function getServerSideProps(context: NextPageContext) {
//   const { query } = context;
//   try {
//     const res = await applicationService.getAllApplications(
//       query.entityId as string
//     );
//     const applications = res || [];
//     let applicationTableData: applicationTableDataType[] = [];

//     applicationTableData = applications.map((application: any) => {
//       return {
//         id: application.id,
//         applicationId: application.applicationNumber,
//         product: "Importer financing",
//         dateFrom: convertDate(application.issuanceDate),
//         dateTo: convertDate(application.endDate),
//         importerName: application.exporterName,
//         status: application.status,
//       };
//     });

//     return {
//       props: { applicationTableData, entityId: query.entityId },
//     };
//   } catch (error) {
//     //TODO: Handle error
//     console.error("Error fetching entity:", error);
//     return {
//       props: { ApplicationTable: [], entityId: "" },
//     };
//   }
// }

export default Index;
