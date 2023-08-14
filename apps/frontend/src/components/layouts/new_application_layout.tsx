import ApplicationLeftMenu from "@components/applicationLeftMenu";
import React from "react";
import Layout from "./layout";

interface LayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Layout>
        <ApplicationLeftMenu></ApplicationLeftMenu>
        <div className="mainBodyIn">{children}</div>
      </Layout>
    </>
  );
};

export default ApplicationLayout;
