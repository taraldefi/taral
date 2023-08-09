import React from "react";
import { useRouter } from "next/router";
import { Button } from "taral-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { pageIndexAtom } from "@store/PageIndexStore";
import { useModal } from "@utils/hooks";
import { ApplicationModalAtom, FormModalAtom } from "@store/ModalStore";

function TopBarNav() {
  const router = useRouter();
  const [, setIndex] = useAtom(pageIndexAtom);
  const formModal = useModal(FormModalAtom);
  const entityID = router.query.entityId;
  const newApplicationModal = useModal(ApplicationModalAtom);
  const handleClick1 = () => {
    setIndex(0);
    router.push(`/users/${router.asPath.split("/")[2]}/entities`);
  };

  const TopbarData = [
    {
      id: 1,
      title: "Applications",
      name: "applications",
      path: "/applications",
    },
    {
      id: 2,
      title: "Monitoring",
      name: "monitoring",
      path: "/monitoring",
    },
    {
      id: 3,
      title: "Closed",
      name: "closed",
      path: "/closed",
    },
    {
      id: 4,
      title: "My Tasks & Messages",
      name: "Tasks",
      path: "/tasks",
    },
  ];

  const TopbarNewDataEx = [
    {
      id: 1,
      title: "Overview",
      name: "overview",
      path: `/users/exporter/entities/${entityID}/overview`,
    },
    // {
    //   id: 2,
    //   title: "Profile",
    //   name: "profile",
    //   path: "/users/exporter/profile",
    // },
    {
      id: 2,
      title: "KYC",
      name: "kyc",
      path: `/users/exporter/entities/${entityID}/kyc/generalInfo`,
    },
    {
      id: 3,
      title: "Applications",
      name: "applications",
      path: `/users/exporter/entities/${entityID}/applications`,
    },
    {
      id: 4,
      title: "Repayment",
      name: "repayment",
      path: `/users/exporter/entities/${entityID}/repayment`,
    },
  ];

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

  const matchPath1 = (item: any) => {
    const currentRoute = router.asPath.split("/")[5];

    if (currentRoute === item.name.toLowerCase()) {
      return true;
    } else if (item.name.toLowerCase() == "overview" && router.asPath == "/") {
      return true;
    } else {
      return false;
    }
  };
  const matchPath = (item: any) => {
    const currentRoute = router.asPath.split("/")[1];

    if (currentRoute === item.name.toLowerCase()) {
      return true;
    } else if (
      item.name.toLowerCase() == "applications" &&
      router.asPath == "/"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const matchPathNewApp = () => {
    const currentPath = router.asPath.split("/")[5];
    if (currentPath === "newApplication" || currentPath === "quick") {
      return true;
    }
  };
  return (
    <>
      <div className="topbarLower">
        {matchPathNewApp() ? (
          <>
            <div className="newAppBackContainer">
              <div onClick={handleClick1}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={() => alert("form changes wont be saved")}
                  fontSize="24px"
                  color="#003C6E"
                />
              </div>
              <span>New Application</span>
            </div>
          </>
        ) : (
          <></>
        )}
        {
          //Overview,kyc etc top bar
          router.asPath.split("/")[1] == "users" &&
          router.asPath.split("/")[5] != "newApplication" &&
          router.asPath.split("/")[5] != "quick" ? (
            <div className="userTabItems">
              <div className="contents">
                {router.asPath.split("/")[2] == "exporter"
                  ? TopbarNewDataEx.map((item, index) => {
                      return (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(item.path);
                          }}
                          key={index}
                        >
                          <span
                            className={
                              matchPath1(item) ? "content selected" : "content"
                            }
                          >
                            {item.title}
                          </span>
                        </div>
                      );
                    })
                  : TopbarNewDataIm.map((item, index) => {
                      return (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(item.path);
                          }}
                          key={index}
                        >
                          <span
                            className={
                              matchPath1(item) ? "content selected" : "content"
                            }
                          >
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
              </div>
              <div className="entityContent">
                {router.asPath.split("/").pop() === "entities" ? (
                  <div className="entitySearch">
                    <input
                      type="text"
                      placeholder="Search by name or number..."
                      className="inputs"
                    ></input>
                  </div>
                ) : (
                  <div className="viewEntitySelect">
                    <select name="" id="" className="inputs">
                      <option value="">Entity Name</option>
                    </select>
                  </div>
                )}
                {router.asPath.split("/").pop() === "applications" ? (
                  <div>
                    <Button
                      primary={true}
                      backgroundColor="#1ab98b"
                      label={"New Application"}
                      onClick={() => newApplicationModal.open()}
                    ></Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      primary={false}
                      label={"New Entity"}
                      onClick={() => {
                        formModal.open();
                      }}
                    ></Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            //old application top bar
            router.asPath.split("/")[1] == "applications" && (
              <div className="contents">
                {TopbarData.map((item, index) => {
                  return (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.path);
                      }}
                      key={index}
                    >
                      <span
                        className={
                          matchPath(item) ? "content selected" : "content"
                        }
                      >
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            )
          )
        }
      </div>
    </>
  );
}

export default TopBarNav;
