import EntityView from "@components/entity/entityView";
import Layout from "@components/layouts/layout";
import { EntityTable } from "taral-ui";
import entityService from "@services/entityService";
import React, { useEffect, useState } from "react";
import { Entity } from "src/types";
import { getBase64Src } from "@utils/lib/getBase64";
import { useAtom } from "jotai";
import {
  EntityEditedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import ContentLoader from "react-content-loader";

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
  const [entityData, setEntityData] = useState<Entity>();
  const [currentSelectedEntity] = useAtom(currentSelectedEntityAtom);
  const entityId = currentSelectedEntity;
  const [entityEdited] = useAtom(EntityEditedAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        await entityService.getEntity(entityId as string).then(async (data) => {
          if (data.id) {
            const image = await entityService.getEntityLogo(data.logo);
            data.logo = getBase64Src(image);
            setEntityData(data);
          }
        });
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    }

    fetchData();
  }, [entityEdited, currentSelectedEntity]);
  const MyLoader = (props: any) => (
    <ContentLoader
      speed={2}
      width={700}
      height={500}
      viewBox="0 0 700 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="153" rx="3" ry="3" width="558" height="6" />
      <rect x="0" y="173" rx="3" ry="3" width="380" height="6" />
      <rect x="2" y="12" rx="25" ry="25" width="130" height="123" />
      <rect x="145" y="15" rx="5" ry="5" width="422" height="35" />
      <rect x="260" y="95" rx="3" ry="3" width="104" height="7" />
      <rect x="145" y="95" rx="3" ry="3" width="104" height="7" />
      <rect x="145" y="117" rx="3" ry="3" width="75" height="5" />
      <rect x="260" y="117" rx="3" ry="3" width="75" height="5" />
      <rect x="6" y="218" rx="3" ry="3" width="562" height="123" />
      <rect x="7" y="357" rx="3" ry="3" width="558" height="123" />
    </ContentLoader>
  );

  return (
    <Layout>
      <div className="viewbody">
        <div className="viewContainer">
          {entityData ? (
            <EntityView
              infoData={{
                id: entityData.id,
                name: entityData.name,
                logo: entityData.logo,
                BeneficialOwner: entityData.beneficialOwner,
                CodeAbbreviation: entityData.abbreviation,
                Nationality: entityData.nationality,
                HeadquartersLocation: entityData.headquarters,
                IndustryType: entityData.industryType,
                CoreBusiness: entityData.coreBusiness,
                IncorporationDate: entityData.incorporationDate,
                LegalForm: entityData.legalForm,
                productCount: 20,
              }}
            />
          ) : (
            <MyLoader></MyLoader>
          )}
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
