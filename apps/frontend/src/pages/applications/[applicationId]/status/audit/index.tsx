import StatusLayout from "@components/layouts/auditor/status_layout";
import { AuditTable } from "taral-ui";

const TableData = [
  {
    action: "Application review",
    user: {
      avatar: "/assets/images/1.png",
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
    },
    activity: "Change",
    date: "19.10.2019",
  },
  {
    action: "Application review",
    user: {
      avatar: "/assets/images/1.png",
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
    },
    activity: "Review",
    date: "19.10.2019",
  },
  {
    action: "Application review",
    user: {
      avatar: "/assets/images/1.png",
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
    },
    activity: "Completed",
    date: "19.10.2019",
  },
];

export default function Audit() {
  return (
    <StatusLayout showexport={true}>
      <AuditTable auditTableData={TableData} />
    </StatusLayout>
  );
}
