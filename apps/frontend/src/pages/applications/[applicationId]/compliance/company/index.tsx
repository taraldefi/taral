import ComplianceLayout from "@components/layouts/compliance_layout";
import { CompanyTable } from "taral-ui";

const TableData = [
  {
    persons: "Business Name",
    details: "Business Name",
    source: "https://www.google.com/",
    status: false,
  },
  {
    persons: "Registration Number",
    details: "Registration Number",
    source: "https://www.google.com/",
    status: true,
  },
  {
    persons: "Jurisdiction of Incorporation",
    details: "Jurisdiction of Incorporation",
    source: "https://www.google.com/",
    status: false,
  },
  {
    persons: "Country",
    details: "Country",
    source: "https://www.google.com/",
    status: false,
  },
  {
    persons: "State",
    details: "State",
    source: "https://www.google.com/",
    status: false,
  },
  {
    persons: "City",
    details: "City",
    source: "https://www.google.com/",
    status: true,
  },
  {
    persons: "Postcode",
    details: "Postcode",
    source: "https://www.google.com/",
    status: true,
  },
  {
    persons: "Street Name",
    details: "Street Name",
    source: "https://www.google.com/",
    status: false,
  },
];

function Company() {
  return (
    <ComplianceLayout showexport={true}>
      <span className="title" style={{ fontSize: "13.5px" }}>
        BUSINESS DETAILS
      </span>
      <br />
      <CompanyTable companyTableData={TableData} />
    </ComplianceLayout>
  );
}

export default Company;
