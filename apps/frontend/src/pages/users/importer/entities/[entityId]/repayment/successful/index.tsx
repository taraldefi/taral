import { PaymentSuccessCard } from "taral-ui";
import Topbar from "@components/topBar";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import moment from "moment";

function Index() {
  const amount = useSearchParams().get("amount");
  const router = useRouter();
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Topbar></Topbar>

      <div className="paymentSuccessContainer">
        <PaymentSuccessCard
          onPrint={() => {}}
          onBack={() => {
            router.push(
              `/users/${router.asPath.split("/")[2]}/entities/${
                router.asPath.split("/")[4]
              }/applications`
            );
          }}
          paymentDetails={{
            date: moment().format("DD/MM/YYYY"),
            method: "USD-Stablecoin",
            amount: parseInt(amount!),
          }}
        />
      </div>
    </div>
  );
}

export default Index;
