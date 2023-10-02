import EntityView from "@components/entity/entityView";
import Layout from "@components/layouts/layout";
import useModal from "@hooks/useModal";
import entityService from "@services/entityService";
import { DeleteModalAtom, selectedEntityModalAtom } from "@store/ModalStore";
import {
  EntityDeletedAtom,
  EntityEditedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import fetchEntityLogo from "@utils/lib/fetchEntityLogo";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { Entity, EntityCardResponse } from "src/types";
import { DeleteModal, EntityTable } from "taral-ui";

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

function index(props: { entityData: EntityCardResponse; hasError: boolean }) {
  const [entityData, setEntityData] = useState<Entity>();
  const [currentSelectedEntity] = useAtom(currentSelectedEntityAtom);

  const entityId = currentSelectedEntity;
  const [entityEdited] = useAtom(EntityEditedAtom);
  const [, setEntityDeleted] = useAtom(EntityDeletedAtom);
  const [, setSelectedEntity] = useAtom(selectedEntityModalAtom);
  const deleteModal = useModal(DeleteModalAtom);
  const router = useRouter();

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await entityService.getEntity(entityId as string).then(async (data) => {
  //         if (data.id) {
  //           const image = await fetchEntityLogo(data.logo);
  //           data.logo = image;
  //           setEntityData(data);
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error fetching entity:", error);
  //     }
  //   }

  //   fetchData();
  // }, [entityEdited, currentSelectedEntity]);
  if (props.hasError) {
    return <h1>Error - please try another parameter</h1>;
  }

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const handleDelete = async (entityIdToDelete: string) => {
    try {
      await entityService.deleteEntity(entityIdToDelete).then((data) => {
        if (data) {
          // Update the state to remove the deleted entity

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
          {props.entityData ? (
            <EntityView
              infoData={{
                id: props.entityData.id,
                name: props.entityData.name,
                logo: "",
                BeneficialOwner: "",
                CodeAbbreviation: "",
                Nationality: "",
                HeadquartersLocation: "",
                IndustryType: "",
                CoreBusiness: "",
                IncorporationDate: "",
                LegalForm: "",
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
export const getStaticProps: GetStaticProps = async (context) => {
  const itemID = context.params?.entityId;
  const data = await entityService.getAllEntity();
  const foundItem = data.find((item: EntityCardResponse) => itemID === item.id);

  if (!foundItem) {
    return {
      props: { hasError: true },
    };
  }

  return {
    props: {
      entityData: foundItem,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await entityService.getAllEntity();
  const pathsWithParams = data.map((entity: EntityCardResponse) => ({
    params: { entityId: entity.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export default index;
