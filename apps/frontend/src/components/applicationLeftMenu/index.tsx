import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { pageIndexAtom } from "@store/PageIndexStore";
import { PortalIcons } from "../icons";
import MenuItem from "./MenuItem";

export default function ApplicationLeftMenu() {
  const router = useRouter();
  const [, setIndex] = useAtom(pageIndexAtom);
  const entityID = router.query.entityId;
  const SidebarDataEx = [
    {
      id: 0,
      title: "Exporter Info",
      name: "exporterInfo",
      path: `/users/exporter/entities/${entityID}/quick/exporterInfo`,
    },
    {
      id: 1,
      title: "Importer Info",
      name: "importerInfo",
      path: `/users/exporter/entities/${entityID}/quick/importerInfo`,
    },
    {
      id: 2,
      title: "Contract",
      name: "contract",
      path: `/users/exporter/entities/${entityID}/quick/contract`,
    },
    {
      id: 3,
      title: "Payment terms",
      name: "paymentTerms",
      path: `/users/exporter/entities/${entityID}/quick/paymentTerms`,
    },
    {
      id: 4,
      title: "Security",
      name: "security",
      path: `/users/exporter/entities/${entityID}/quick/security`,
    },
    {
      id: 5,
      title: "Transaction Docs",
      name: "Transaction Docs",
      path: `/users/exporter/entities/${entityID}/quick/transactionDocs`,
    },
  ];
  const SidebarDataIm = [
    {
      id: 0,
      title: "Exporter Info",
      name: "Your Info",
      path: `/users/importer/entities/${entityID}/quick/exporterInfo`,
    },
    {
      id: 1,
      title: "Importer Info",
      name: "Supplier Info",
      path: `/users/importer/entities/${entityID}/quick/importerInfo`,
    },
    {
      id: 2,
      title: "Order Details",
      name: "Order Details",
      path: `/users/importer/entities/${entityID}/quick/orderDetails`,
    },
    {
      id: 3,
      title: "Payment Terms",
      name: "Payment Terms",
      path: `/users/importer/entities/${entityID}/quick/paymentTerms`,
    },
    {
      id: 4,
      title: "Security",
      name: "Security",
      path: `/users/importer/entities/${entityID}/quick/security`,
    },
    {
      id: 5,
      title: "Transaction Docs",
      name: "Transaction Docs",
      path: `/users/importer/entities/${entityID}/quick/transactionDocs`,
    },
  ];

  return (
    <div className="leftMenu">
      {router.asPath.split("/")[5] == "newApplication" ? (
        <div className="items">
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push(
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/exporterInfo`
              );
            }}
            id={0}
            icon={"Exporter Info"}
            title="Exporter Info"
          ></MenuItem>

          <MenuItem id={1} icon={"Financials - P&L"} title="Financials - P&L">
            <p
              onClick={() => {
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/financials-p&l/profit&loss`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/financials-p&l/profit&loss`
                  ? "selectedSub"
                  : ""
              }
            >
              Profit & Loss
            </p>
            <p
              onClick={() => {
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/financials-p&l/balanceSheet`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/financials-p&l/balanceSheet`
                  ? "selectedSub"
                  : ""
              }
            >
              Balance Sheet
            </p>
            <p
              onClick={() => {
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/financials-p&l/cashFlow`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/financials-p&l/cashFlow`
                  ? "selectedSub"
                  : ""
              }
            >
              Cash Flow
            </p>
          </MenuItem>

          <MenuItem
            id={2}
            icon={"Transaction Details"}
            title="Transaction Details"
          >
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/transactionDetails/projectDetails`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/transactionDetails/projectDetails`
                  ? "selectedSub"
                  : ""
              }
            >
              Project Details
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/transactionDetails/contactAndDelivery`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/transactionDetails/contactAndDelivery`
                  ? "selectedSub"
                  : ""
              }
            >
              Contract and Delivery
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/transactionDetails/additionalInfo`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/transactionDetails/additionalInfo`
                  ? "selectedSub"
                  : ""
              }
            >
              Additional Info
            </p>
          </MenuItem>

          <MenuItem id={3} icon={"Importer Info"} title="Importer Info">
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/importerInfo/information`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/importerInfo/information`
                  ? "selectedSub"
                  : ""
              }
            >
              Information
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/importerInfo/business`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/importerInfo/business`
                  ? "selectedSub"
                  : ""
              }
            >
              Business
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/importerInfo/relationship`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/importerInfo/relationship`
                  ? "selectedSub"
                  : ""
              }
            >
              Relationship
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/importerInfo/attachments`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/importerInfo/attachments`
                  ? "selectedSub"
                  : ""
              }
            >
              Attachments
            </p>
          </MenuItem>

          <MenuItem id={4} icon={"Payment Terms"} title="Payment Terms">
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/paymentTerms/details`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/paymentTerms/details`
                  ? "selectedSub"
                  : ""
              }
            >
              Details
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${
                    router.asPath.split("/")[2]
                  }/entities/${entityID}/newApplication/paymentTerms/paymentType`
                );
              }}
              className={
                router.asPath ==
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/paymentTerms/paymentType`
                  ? "selectedSub"
                  : ""
              }
            >
              Payment Type
            </p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push(
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/security`
              );
            }}
            id={5}
            icon={"Security"}
            title="Security"
          ></MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              router.push(
                `/users/${
                  router.asPath.split("/")[2]
                }/entities/${entityID}/newApplication/closing`
              );
            }}
            id={6}
            icon={"closing"}
            title="Closing"
          ></MenuItem>
        </div>
      ) : router.asPath.split("/")[2] == "exporter" &&
        router.asPath.split("/")[5] == "quick" ? (
        <div className="itemsNew">
          {SidebarDataEx.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   setIndex(item.id);
                  //   router.push(item.path);
                  // }}
                  className="item"
                >
                  <PortalIcons
                    icon={item.title}
                    selected={router.asPath == item.path ? true : false}
                  />
                  <span
                    className={router.asPath == item.path ? "selected" : ""}
                  >
                    {item.title}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      ) : router.asPath.split("/")[2] == "importer" &&
        router.asPath.split("/")[5] == "quick" ? (
        <div className="itemsNew">
          {SidebarDataIm.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setIndex(item.id);
                    router.push(item.path);
                  }}
                  className="item"
                >
                  <PortalIcons
                    icon={item.title}
                    selected={router.asPath == item.path ? true : false}
                  />
                  <span
                    className={router.asPath == item.path ? "selected" : ""}
                  >
                    {item.name}
                  </span>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
