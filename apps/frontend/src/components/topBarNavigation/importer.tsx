import { currentSelectedEntityAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import React from "react";

const importer = () => {
  const [currentSelectedEntity, setCurrentSelectedEntity] = useAtom(
    currentSelectedEntityAtom
  );
  entityID = currentSelectedEntity;
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
  return <div>importer</div>;
};

export default importer;
