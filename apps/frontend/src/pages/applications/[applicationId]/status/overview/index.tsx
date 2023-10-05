import StatusLayout from "@components/layouts/auditor/status_layout";
import { OverviewTable } from "taral-ui";

const TableData = [
  {
    process: "Application review",
    users: [
      "/assets/images/1.png",
      "/assets/images/2.png",
      "/assets/images/3.png",
      "/assets/images/4.png",
      "/assets/images/5.png",
    ],
    progress: 27,
    status: "Active",
    date: "19.10.2019",
  },
  {
    process: "Credit assessment",
    users: [
      "/assets/images/1.png",
      "/assets/images/2.png",
      "/assets/images/3.png",
      "/assets/images/4.png",
      "/assets/images/5.png",
    ],
    progress: 27,
    status: "Active",
    date: "19.10.2019",
  },
  {
    process: "KYC",
    users: [
      "/assets/images/1.png",
      "/assets/images/2.png",
      "/assets/images/3.png",
      "/assets/images/4.png",
      "/assets/images/5.png",
    ],
    progress: 27,
    status: "Active",
    date: "19.10.2019",
  },
  {
    process: "Account opened",
    users: [
      "/assets/images/1.png",
      "/assets/images/2.png",
      "/assets/images/3.png",
      "/assets/images/4.png",
      "/assets/images/5.png",
    ],
    progress: 27,
    status: "Active",
    date: "19.10.2019",
  },
  {
    process: "Transaction documents review",
    users: [
      "/assets/images/1.png",
      "/assets/images/2.png",
      "/assets/images/3.png",
      "/assets/images/4.png",
      "/assets/images/5.png",
    ],
    progress: 27,
    status: "Active",
    date: "19.10.2019",
  },
  {
    process: "Disbursement of loan facility",
    users: [
      "/assets/images/1.png",
      "/assets/images/2.png",
      "/assets/images/3.png",
      "/assets/images/4.png",
      "/assets/images/5.png",
    ],
    progress: 27,
    status: "Active",
    date: "19.10.2019",
  },
];

export default function Overview() {
  return (
    <StatusLayout showexport={true}>
      <OverviewTable overviewTableData={TableData} />
    </StatusLayout>
  );
}
