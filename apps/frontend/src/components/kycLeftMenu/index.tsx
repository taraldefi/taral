import React from "react";
import { PortalIcons } from "../icons";
import { useRouter } from "next/router";
import SidebarData from "./data";

export default function LeftMenu() {
  const router = useRouter();
  const entityID = router.query.entityId;
  console.log(entityID);
  function checkActive(item: any) {
    if (router.asPath.includes(item.path)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="leftMenuKyc">
      <div className="items">
        {SidebarData.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  `/users/${router.asPath.split("/")[2]}/entities/${entityID}/${
                    item.path
                  }`
                );
              }}
              key={index}
              className="item"
            >
              <PortalIcons icon={item.title} selected={checkActive(item)} />
              <span className={checkActive(item) ? "selected" : ""}>
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
