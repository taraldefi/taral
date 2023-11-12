import React from "react";
import DashBoardLayout from "@components/layouts/auditor/dashboard/dashboard_layout";
import SortBarNav from "@components/sortBar";
import { SortBarItem } from "src/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface DashBoardPageLayoutProps {
  children: React.ReactNode;
  sortBarData?: Array<SortBarItem>;
  showexport: boolean;
  exporter: string;
  importer: string;
  date: string;
}
export default function DashBoardPageLayout({
  children,
  sortBarData,
  showexport,
  exporter,
  importer,
  date,
}: DashBoardPageLayoutProps) {
  return (
    <DashBoardLayout>
      <div className="rightContent">
        <div className="sortBackground">
          <div className="titleBox">
            {showexport ? (
              <span id="bodyTitle">
                {" "}
                {exporter} - {importer} - {date}{" "}
              </span>
            ) : (
              <div className="messageBox">
                <FontAwesomeIcon color="#94A3B8" icon={faArrowLeft} />
                <span>Messages</span>
              </div>
            )}

            {sortBarData && (
              <div className="background">
                <SortBarNav data={sortBarData!} width={""}></SortBarNav>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </DashBoardLayout>
  );
}
