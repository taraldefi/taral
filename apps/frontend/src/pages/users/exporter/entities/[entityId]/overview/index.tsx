import EntityView from "@components/entity/entityView";
import Layout from "@components/layouts/layout";
import { EntityTable } from "taral-ui";

const TableData = [
  {
    productTitle: "Product Title",
    issuanceDate: "13.10.2021",
    maturityDate: "13.10.2021",
    facilityAmount: 956,
  },
  {
    productTitle: "Product Title",
    issuanceDate: "13.10.2021",
    maturityDate: "13.10.2021",
    facilityAmount: 956,
  },
  {
    productTitle: "Product Title",
    issuanceDate: "13.10.2021",
    maturityDate: "13.10.2021",
    facilityAmount: 956,
  },
  {
    productTitle: "Product Title",
    issuanceDate: "13.10.2021",
    maturityDate: "13.10.2021",
    facilityAmount: 956,
  },
  {
    productTitle: "Product Title",
    issuanceDate: "13.10.2021",
    maturityDate: "13.10.2021",
    facilityAmount: 956,
  },
  {
    productTitle: "Product Title",
    issuanceDate: "13.10.2021",
    maturityDate: "13.10.2021",
    facilityAmount: 956,
  },
];

function index() {
  return (
    <Layout>
      <div className="viewbody">
        <div className="viewContainer">
          <EntityView
            infoData={{
              BeneficialOwner: "John Smith",
              CodeAbbreviation: "55-NB",
              Nationality: "German",
              HeadquartersLocation: "Berlin",
              IndustryType: "Information Technology",
              CoreBusiness: "Software Development",
              IncorporationDate: "July 2012",
              LegalForm: "Limited",
            }}
          />
        </div>
        <div className="viewTableContainer">
          <span>Products</span>
          <EntityTable entityTableData={TableData} />
        </div>
      </div>
    </Layout>
  );
}

export default index;
