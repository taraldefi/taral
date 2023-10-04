import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { pageIndexAtom } from "@store/PageIndexStore";
import { useRouter } from "next/router";

const NewApplicationTopNav = () => {
  const [, setIndex] = useAtom(pageIndexAtom);
  const router = useRouter();
  const handleClick = () => {
    setIndex(0);
    router.push(`/users/${router.asPath.split("/")[2]}/entities`);
  };
  return (
    <div>
      <div className="topbarLower">
        <div className="newAppBackContainer">
          <div onClick={handleClick}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => alert("form changes wont be saved")}
              fontSize="24px"
              color="#003C6E"
            />
          </div>
          <span>New Application</span>
        </div>
      </div>
    </div>
  );
};

export default NewApplicationTopNav;
