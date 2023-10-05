import React from "react";
import SignOffLayout from "@components/layouts/auditor/signOffLayout";
import { SignOffTable } from "taral-ui";

const SignoffTableData = [
  {
    name: "Vincent Lauer",
    image: "/assets/images/1.png",
    email: "Email@company.com",
    position: "Head of Credit",
    statusSeen: true,
    statusSigned: false,
  },
];

function SignOff() {
  return (
    <>
      <SignOffLayout showexport={true}>
        <SignOffTable signOffTableData={SignoffTableData} />
      </SignOffLayout>
    </>
  );
}

export default SignOff;
