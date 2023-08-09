import Layout from "@components/layouts/layout";
import { ApplicationTable } from "taral-ui";

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
function Index() {
  return (
    <Layout>
      <div className="viewbody">
        <div style={{ padding: "10%", width: "100%" }}>
          <ApplicationTable applicationTableData={TableData}></ApplicationTable>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
