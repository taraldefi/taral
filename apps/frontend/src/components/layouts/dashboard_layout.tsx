import React from "react";
import LeftMenu from "../leftMenu";
import Layout from "./layout";

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
