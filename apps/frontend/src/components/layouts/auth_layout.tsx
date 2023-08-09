import React from "react";
import Image from "next/image";
interface LayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="regContainer">
      <div className="regSideMenu">
        <div className="regImageContainer">
          <Image
            src="/assets/images/logo1.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="regMainBody">{children}</div>
    </div>
  );
};

export default AuthLayout;
