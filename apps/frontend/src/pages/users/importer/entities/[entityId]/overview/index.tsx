import EntityView from "@components/entity/entityView";
import Layout from "@components/layouts/layout";
import { DeleteModal, EntityTable } from "taral-ui";
import entityService from "@services/entityService";
import React, { useEffect, useState } from "react";
import { Entity } from "src/types";
import { useAtom } from "jotai";
import {
  EntitiesAtom,
  EntityDeletedAtom,
  EntityEditedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import ContentLoader from "react-content-loader";
import { DeleteModalAtom, selectedEntityModalAtom } from "@store/ModalStore";
import useModal from "@hooks/useModal";
import { useRouter } from "next/router";
import fetchEntityLogo from "@utils/lib/fetchEntityLogo";

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
  const [, setEntities] = useAtom(EntitiesAtom);
  const entityId = currentSelectedEntity;
  const [entityEdited] = useAtom(EntityEditedAtom);
  const [, setEntityDeleted] = useAtom(EntityDeletedAtom);
  const [, setSelectedEntity] = useAtom(selectedEntityModalAtom);
  const deleteModal = useModal(DeleteModalAtom);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        await entityService.getEntity(entityId as string).then(async (data) => {
          if (data.id) {
            const image = await fetchEntityLogo(data.logo);
            data.logo = image;
            setEntityData(data);
          }
        });
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    }

    fetchData();
  }, [entityEdited, currentSelectedEntity]);

  const handleDelete = async (entityIdToDelete: string) => {
    try {
      await entityService.deleteEntity(entityIdToDelete).then((data) => {
        if (data) {
          // Update the state to remove the deleted entity
          setEntities((prevEntities: any) =>
            prevEntities.filter((entity: any) => entity.id !== entityIdToDelete)
          );
          setEntityDeleted(entityIdToDelete);
          // Clear the modal entity ID state so that the Modal components doesn't fetch a deleted entity
          setSelectedEntity("");
          deleteModal.close();

          router.push(`/users/${router.asPath.split("/")[2]}/entities`);
        }
      });
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

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
      <DeleteModal
        title="Delete Entity"
        onDelete={async () => {
          if (deleteModal.entityId) handleDelete(deleteModal.entityId);
        }}
        isOpen={deleteModal.isOpen}
        onClose={() => deleteModal.close()}
      ></DeleteModal>
    </Layout>
  );
}

export default index;
