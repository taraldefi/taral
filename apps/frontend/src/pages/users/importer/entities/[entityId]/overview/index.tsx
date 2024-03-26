import EntityView from "@components/entity/entityView";
import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import useModal from "@hooks/useModal";
import entityService from "@services/entityService";
import { DeleteModalAtom, selectedEntityModalAtom } from "@store/ModalStore";
import {
  EntityDeletedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import { useAtom } from "jotai";
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { Entity, EntityCardResponse, EntityResponse } from "src/types";
import {
  ApplicationTable,
  DeleteModal,
  EntityTable,
  applicationTableDataType,
} from "@lib";
import applicationService from "@services/application/applicationService";
import useTaralContracts from "@hooks/useTaralContracts";
import { useAccount } from "@micro-stacks/react";
import { LENDER_ADDRESS } from "@utils/lib/constants";
import convertDate from "@utils/lib/convertDate";
import FinanceButton from "@components/widgets/FinanceButton";
import ClaimButton from "@components/widgets/ClaimButton";

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

function index({ ...props }) {
  const [, setEntityDeleted] = useAtom(EntityDeletedAtom);
  const [, setSelectedEntity] = useAtom(selectedEntityModalAtom);
  const deleteModal = useModal(DeleteModalAtom);
  const router = useRouter();
  const [applicationTableData, setApplicationTableData] = useState<
    applicationTableDataType[]
  >([]);
  const { checkPurchaseOrderHasActiveFinancing, getPurchaseOrderById } =
    useTaralContracts();
  const [activeApplicationId, setActiveApplicationId] = useState<string>("");
  const { stxAddress } = useAccount();
  const [entityData, setEntityData] = useState<EntityResponse>();

  if (router.isFallback) {
    return;
  }
  useEffect(() => {
    fetchApplicationTableData();
  }, []);
  async function fetchApplicationTableData() {
    try {
      const res = await applicationService.getAllApplications(
        props.query.entityId || (router.asPath.split("/")[4] as string)
      );
      const applications = res || [];
      console.log(res);
      let applicationTableData: applicationTableDataType[] = [];

      applicationTableData = applications.map(async (application: any) => {
        const claimable = await checkPurchaseOrderHasActiveFinancing(
          application.id
        );
        if (application.status === "ACTIVE") {
          setActiveApplicationId(application.id);
        }

        const purchaseOrder = await getPurchaseOrderById(application.id);

        let alreadyAccepted = false;
        if (purchaseOrder) {
          alreadyAccepted = purchaseOrder["accepted-financing-id"]
            ? true
            : false;
        }

        const userIsLender = stxAddress === LENDER_ADDRESS;
        console.log(userIsLender, stxAddress, LENDER_ADDRESS);

        return {
          id: application.id,
          applicationId: application.id,
          product: "Importer financing",
          dateFrom: convertDate(application.issuanceDate),
          dateTo: convertDate(application.endDate),
          importerName: application.exporterName,
          status: {
            label: alreadyAccepted
              ? "LOAN FUNDED"
              : application.status.replace("_", " "),
            claimable: (claimable && !alreadyAccepted) || userIsLender,
            component:
              userIsLender && !alreadyAccepted && purchaseOrder ? (
                <FinanceButton applicationId={application.id} />
              ) : claimable && !alreadyAccepted ? (
                <ClaimButton />
              ) : (
                <>--</>
              ),
          },
        };
      });

      setApplicationTableData(await Promise.all(applicationTableData));
    } catch (error) {
      //TODO: Handle error
      console.error("Error fetching entity:", error);
      return {
        props: { ApplicationTable: [], entityId: "" },
      };
    }
  }

  async function fetchEntityData() {
    try {
      const res = await entityService.getEntity(
        props.query.entityId || (router.asPath.split("/")[4] as string)
      );
      setEntityData(res);
    } catch (error) {
      console.log("Error fetching entity:", error);
    }
  }

  useEffect(() => {
    fetchEntityData();
  }, []);

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
    <ImporterBaseLayout>
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
                registrationNumber: entityData.registrationNumber,
                HeadquartersLocation: entityData.headquarters,
                IndustryType: entityData.industryType,
                CoreBusiness: entityData.coreBusiness,
                IncorporationDate: entityData.incorporationDate,
                LegalForm: entityData.legalForm,
                productCount: 20,
                applicationCount: entityData.applications.length,
              }}
            />
          ) : (
            <MyLoader></MyLoader>
          )}
        </div>
        <div className="viewTableContainer">
          <span>Applications</span>
          {/* <EntityTable entityTableData={TableData} /> */}
          <ApplicationTable
            applicationTableData={applicationTableData}
          ></ApplicationTable>
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
    </ImporterBaseLayout>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  {
    const { query } = context;
    return { props: { query } };
  }
};
// export const getStaticProps: GetStaticProps = async (context) => {
//   const itemID = context.params?.entityId;

//   const entity = await entityService.getEntity(itemID as string);

//   return {
//     props: {
//       entityData: entity,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await entityService.getAllEntity();
//   const pathsWithParams = data.map((entity: EntityCardResponse) => ({
//     params: { entityId: entity.id },
//   }));

//   return {
//     paths: pathsWithParams,
//     fallback: true,
//   };
// };

export default index;
