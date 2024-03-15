import { PaymentSuccessCard } from "@lib";
import Topbar from "@components/topBar";
import { useRouter } from "next/router";

function Index() {
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
            router.back();
          }}
          paymentDetails={{
            date: "March 19, 2023",
            method: "USD-Stablecoin",
            amount: 2000,
          }}
        />
      </div>
    </div>
  );
}

export default Index;
