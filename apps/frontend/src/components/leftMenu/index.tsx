import React from "react";
import { PortalIcons } from "../icons";
import { useRouter } from "next/router";
import { ProgressBar } from "taral-ui";

export default function LeftMenu() {
  const router = useRouter();
  const applicationID = router.query.applicationId;
  function checkActive(item: any) {
    const result = router.asPath.split("/").map((element) => element.trim());
    const match = result.find((element) => {
      if (element == item.name.toLowerCase()) {
        return true;
      }
    });

    if (item.path == router.asPath) {
      return true;
    } else if (item.name == "summary" && router.asPath == "/") {
      return true;
    } else if (match) {
      return true;
    } else {
      return false;
    }
  }
  const SidebarData = [
    {
      id: 1,
      title: "Summary",
      name: "summary",
      path: `/applications/${applicationID}/summary`,
    },
    {
      id: 2,
      title: "Status",
      name: "status",
      path: `/applications/${applicationID}/status/overview`,
    },
    {
      id: 3,
      title: "Transaction",
      name: "transaction",
      path: `/applications/${applicationID}/transaction/supplier`,
    },
    {
      id: 4,
      title: "Financial",
      name: "financial",
      path: `/applications/${applicationID}/financial/profit`,
    },
    {
      id: 5,
      title: "External Reports",
      name: "external",
      path: `/applications/${applicationID}/external/credit`,
    },
    {
      id: 6,
      title: "Compliance",
      name: "compliance",
      path: `/applications/${applicationID}/compliance/company`,
    },
    {
      id: 7,
      title: "Research & Sentiment",
      name: "research",
      path: `/applications/${applicationID}/research/research`,
    },
    {
      id: 8,
      title: "Cover",
      name: "cover",
      path: `/applications/${applicationID}/cover/approval`,
    },
    {
      id: 9,
      title: "Trade Documents",
      name: "trade",
      path: `/applications/${applicationID}/trade/contract`,
    },
    {
      id: 10,
      title: "Rating",
      name: "rating",
      path: `/applications/${applicationID}/rating/quantitative`,
    },
    {
      id: 11,
      title: "Sign Off",
      name: "signoff",
      path: `/applications/${applicationID}/signoff`,
    },
  ];
  return (
    <div className="leftMenu">
      <div className="items">
        {SidebarData.map((item, index) => {
          return (
            <div
              onClick={(e) => {
                e.preventDefault();
                router.push(item.path);
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
      <div className="progressBox">
        <ProgressBar progress={27} color={"#003C6E"} showText={true} />
      </div>
    </div>
  );
}
