import React from "react";
import NewLayout from "./testLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const KYCLayout = ({ children }: LayoutProps) => {
  return (
    <NewLayout>
      <div className="bodyContent">{children}</div>
    </NewLayout>
  );
};

export default KYCLayout;
