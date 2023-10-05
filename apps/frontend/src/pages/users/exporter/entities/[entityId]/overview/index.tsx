import EntityView from "@components/entity/entityView";
import ExporterBaseLayout from "@components/layouts/exporter/exporterBaseLayout";
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
    <ExporterBaseLayout>
      <div className="viewbody">
        <div className="viewContainer">
          <EntityView
            infoData={{
              id: "123",
              name: "",
              logo: "",
              productCount: 3,
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
    </ExporterBaseLayout>
  );
}

export default index;
