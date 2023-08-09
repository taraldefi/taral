import { Button } from "taral-ui";
import { useRouter } from "next/router";

function BottomBar({ onSubmit, onBack }: any) {
  const router = useRouter();

  const paths = [
    "exporterInfo",
    "importerInfo",
    "contract",
    "paymentTerms",
    "security",
    "transactionDocs",
  ];
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
              paths.indexOf(router.asPath.split("/")[6]) === paths.length - 1
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
