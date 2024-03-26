import entityService from "@services/entityService";
import {
  EntityCreatedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EntityCardResponse } from "src/types";
import ApplicationTopNavRightComponent from "./applicationTopNav";
import KycTopNavRightComponent from "./kycTopNav";
import OverviewTopNavRightComponent from "./overviewTopNav";
import applicationService from "@services/application/applicationService";

const ImporterTopNav = () => {
  // const [currentSelectedEntity] = useAtom(currentSelectedEntityAtom);
  const router = useRouter();
  const entityID = router.asPath.split("/")[4];
  const [entities, setEntities] = useState<EntityCardResponse[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [entityCreated] = useAtom(EntityCreatedAtom);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await entityService.getAllEntity();
        setEntities(res);
        const applications = await applicationService.getAllApplications(
          entityID
        );
        setApplications(applications);
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    }

    fetchData();
  }, [entityCreated]);

  const TopbarNewDataIm = [
    {
      id: 1,
      title: "Overview",
      name: "overview",
      path: `/users/importer/entities/${entityID}/overview`,
    },
    // {
    //   id: 2,
    //   title: "Profile",
    //   name: "profile",
    //   path: "/users/importer/profile",
    // },
    {
      id: 2,
      title: "KYC",
      name: "kyc",
      path: `/users/importer/entities/${entityID}/kyc/generalInfo`,
    },
    {
      id: 3,
      title: "Applications",
      name: "applications",
      path: `/users/importer/entities/${entityID}/applications`,
    },
    {
      id: 4,
      title: "Repayment",
      name: "repayment",
      path: `/users/importer/entities/${entityID}/repayment`,
    },
  ];
  const matchPath = (item: any) => {
    const currentRoute = router.asPath.split("/")[5];

    if (currentRoute === item.name.toLowerCase()) {
      return true;
    } else if (item.name.toLowerCase() == "overview" && router.asPath == "/") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="topbarLower">
      <div className="userTabItems">
        <div className="contents">
          {TopbarNewDataIm.map((item, index) => {
            return (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  router.push(item.path);
                }}
                key={index}
              >
                <span
                  className={matchPath(item) ? "content selected" : "content"}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="entityContent">
          {(() => {
            switch (router.asPath.split("/").pop()) {
              case "overview":
                return <OverviewTopNavRightComponent entities={entities} />;
              case "applications":
                return <ApplicationTopNavRightComponent entities={entities} />;

              case "repayment":
                return (
                  // <RepaymentTopNavRightComponent applications={applications} />
                  <></>
                );

              case "pay":
                return (
                  // <RepaymentTopNavRightComponent applications={applications} />
                  <></>
                );

              default:
                return <KycTopNavRightComponent entities={entities} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ImporterTopNav;
