import EntityView from "@components/entity/entityView";
import ImporterBaseLayout from "@components/layouts/importer/importerBaseLayout";
import ClaimButton from "@components/widgets/ClaimButton";
import FinanceButton from "@components/widgets/FinanceButton";
import useModal from "@hooks/useModal";
import useTaralContracts from "@hooks/useTaralContracts";
import { ApplicationTable, DeleteModal, applicationTableDataType } from "@lib";
import { useAccount, useNetwork } from "@micro-stacks/react";
import applicationService from "@services/application/applicationService";
import entityService from "@services/entityService";
import { DeleteModalAtom, selectedEntityModalAtom } from "@store/ModalStore";
import { EntityDeletedAtom } from "@store/entityStore";

import convertDate from "@utils/lib/convertDate";
import { useAtom } from "jotai";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { EntityResponse } from "src/types";

function index({ ...props }) {
  const [, setEntityDeleted] = useAtom(EntityDeletedAtom);
  const [, setSelectedEntity] = useAtom(selectedEntityModalAtom);
  const deleteModal = useModal(DeleteModalAtom);
  const router = useRouter();
  const [allApplicationTableData, setApplicationTableData] = useState<
    applicationTableDataType[]
  >([]);
  const { checkPurchaseOrderHasActiveFinancing, getPurchaseOrderById } =
    useTaralContracts();
  const [, setActiveApplicationId] = useState<string>("");
  const { stxAddress } = useAccount();
  const [entityData, setEntityData] = useState<EntityResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const { network } = useNetwork();

  if (router.isFallback) {
    return;
  }
  useEffect(() => {
    fetchApplicationTableData();
  }, [network]);

  async function fetchApplicationTableData() {
    try {
      const LENDER_ADDRESS =
        network.chainId === 1
          ? process.env.NEXT_PUBLIC_TARAL_LENDER_ADDRESS
          : network.chainId === 2147483648
          ? process.env.NEXT_PUBLIC_TARAL_LENDER_TESTNET_ADDRESS
          : "";

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
      setLoading(false);
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

  const ApplicationLoader = (props: any) => (
    <ContentLoader
      speed={2}
      width={600}
      height={500}
      viewBox="0 0 600 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="13" rx="3" ry="3" width="113" height="17" />
      <rect x="135" y="13" rx="3" ry="3" width="62" height="17" />
      <rect x="0" y="56" rx="3" ry="3" width="599" height="18" />
      <rect x="1" y="85" rx="3" ry="3" width="600" height="18" />
      <rect x="1" y="114" rx="3" ry="3" width="600" height="18" />
      <rect x="232" y="13" rx="3" ry="3" width="62" height="17" />
      <rect x="333" y="13" rx="3" ry="3" width="62" height="17" />
      <rect x="537" y="12" rx="3" ry="3" width="62" height="17" />
      <rect x="431" y="13" rx="3" ry="3" width="62" height="17" />
      <rect x="1" y="143" rx="3" ry="3" width="600" height="18" />
      <rect x="0" y="173" rx="3" ry="3" width="600" height="18" />
    </ContentLoader>
  );

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
          {allApplicationTableData.length > 0 ? (
            <ApplicationTable
              applicationTableData={allApplicationTableData}
            ></ApplicationTable>
          ) : allApplicationTableData.length == 0 && !loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: "20px",
                color: "gray",
              }}
            >
              No applications found under this entity
            </div>
          ) : (
            <div style={{ paddingTop: "15px" }}>
              {" "}
              <ApplicationLoader />
            </div>
          )}
          {/* <EntityTable entityTableData={TableData} /> */}
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
