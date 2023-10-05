import React from "react";
import LeftMenu from "@components/leftMenu";
import Layout from "@components/layouts/layout";

interface LayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <LeftMenu></LeftMenu>
      {children}
    </Layout>
  );
};

export default DashBoardLayout;
