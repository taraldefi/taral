import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { exporterQuickApplicationAtom } from "@store/applicationStore";

function Index() {
  const router = useRouter();
  const entityID = router.query.entityId;
  const [state, setState] = useAtom(exporterQuickApplicationAtom);
  const updateAction = (payload: any) => {
    setState((prev) => ({ ...prev, ...payload }));
  };
  console.log("state:", state);
  const data = { contract: true };
  const onSubmit = () => {
    console.log("data:", data);
    updateAction(data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/paymentTerms`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/importerInfo`
    );
  };

  return (
    <div>
      <ApplicationLayout>
        <div className="contract">
          <h1>Contract Signing</h1>
          <p>
            {" "}
            A contract is a legally enforceable agreement between two or more
            parties that creates, defines, and governs mutual rights and
            obligations between them. A contract typically involves the transfer
            of goods, services, money, or a promise to transfer any of those at
            a future date. In the event of a breach of contract, the injured
            party may seek judicial remedies such as damages or rescission.
            Contract law, the field of the law of obligations concerned with
            contracts, is based on the principle that agreements must be
            honoured.
          </p>
          <p>
            {" "}
            Contract law, like other areas of private law, varies between
            jurisdictions. The various systems of contract law can broadly be
            split between common law jurisdictions, civil law jurisdictions, and
            mixed law jurisdictions which combine elements of both common and
            civil law. Common law jurisdictions typically require contracts to
            include consideration in order to be valid, whereas civil and most
            mixed law jurisdictions solely require a meeting of the minds
            between the parties.
          </p>
          <p>
            {" "}
            Contract law, like other areas of private law, varies between
            jurisdictions. The various systems of contract law can broadly be
            split between common law jurisdictions, civil law jurisdictions, and
            mixed law jurisdictions which combine elements of both common and
            civil law. Common law jurisdictions typically require contracts to
            include consideration in order to be valid, whereas civil and most
            mixed law jurisdictions solely require a meeting of the minds
            between the parties.
          </p>
          <p>
            {" "}
            Contract law, like other areas of private law, varies between
            jurisdictions. The various systems of contract law can broadly be
            split between common law jurisdictions, civil law jurisdictions, and
            mixed law jurisdictions which combine elements of both common and
            civil law. Common law jurisdictions typically require contracts to
            include consideration in order to be valid, whereas civil and most
            mixed law jurisdictions solely require a meeting of the minds
            between the parties.
          </p>
        </div>
        <BottomBar onBack={onBack} onSubmit={onSubmit}></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export default Index;
