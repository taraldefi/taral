import { Button } from "@lib";
import { useRouter } from "next/router";
import { BottomBarProps } from "src/types";

function BottomBar({ onSubmit, onBack }: BottomBarProps) {
  const router = useRouter();

  let page_paths = [
    "exporterInfo",
    "importerInfo",
    "contract",
    "paymentTerms",
    "security",
    "transactionDocs",
  ];
  if (router.asPath.split("/")[1] === "importer") {
    page_paths = [
      "importerInfo",
      "supplierInfo",
      "orderDetails",
      "paymentTerms",
      "security",
      "transactionDocs",
    ];
  }
  // const handleNextClick = () => {
  //   const nextIndex = index + 1;
  //   if (nextIndex >= paths.length) {
  //     router.push(
  //       `/users/${
  //         router.asPath.split("/")[2]
  //       }/entities/${entityID}/applications`
  //     );
  //     setIndex(0);
  //   } else {
  //     router.push(
  //       `/users/${router.asPath.split("/")[2]}/entities/${entityID}/quick/${
  //         paths[nextIndex]
  //       }`
  //     );
  //     setIndex(nextIndex);
  //   }
  // };
  return (
    <div className="botomBar">
      <div className="bbBackground">
        <div className="btnContainer">
          <Button label={"Back"} onClick={onBack}></Button>
          <Button
            backgroundColor="#1ab98b"
            primary={true}
            label={
              page_paths.indexOf(router.asPath.split("/")[7]) ===
              page_paths.length - 1
                ? "Finish Application"
                : router.asPath.split("/")[6] === "contract"
                ? "Agree & Continue"
                : "Next"
            }
            onClick={onSubmit}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
