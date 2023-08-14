import CRSLayout from "@components/layouts/crs_layout";
import { QuantitativeTable } from "taral-ui";
import { useRouter } from "next/router";

const TableData = [
  {
    factor: "Current Ratio",
    value: "Metric Info/Value",
    status: false,
    metric: 40,
  },
  {
    factor: "Leverage Ratio",
    value: "Metric Info/Value",
    status: true,
    metric: 66,
  },
  {
    factor: "Net Withdrawal/Infusion",
    value: "Metric Info/Value",
    status: true,
    metric: 68,
  },
  {
    factor: "Divident Payout Ratio",
    value: "Metric Info/Value",
    status: true,
    metric: 75,
  },
  {
    factor: "Total Networth",
    value: "Metric Info/Value",
    status: false,
    metric: 49,
  },
];

function Qualitative() {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  const SortbarData = [
    {
      id: 1,
      title: "Quantitative",
      path: `/applications/${applicationID}/rating/quantitative`,
    },
    {
      id: 2,
      title: "Qualitative",
      path: `/applications/${applicationID}/rating/qualitative`,
    },
  ];
  return (
    <CRSLayout showexport={true} sortBarData={SortbarData}>
      <QuantitativeTable quantitativeTableData={TableData}></QuantitativeTable>
    </CRSLayout>
  );
}

export default Qualitative;
