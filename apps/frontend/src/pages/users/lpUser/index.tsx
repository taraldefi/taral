import { PortalIcons } from "@components/icons";
import TopBar from "@components/topBar";
import React from "react";
import { PoolCard } from "@lib";
import logo from "@public/assets/svg/logo.svg";
import { useModal } from "@utils/hooks";
import { YieldModalAtom } from "@store/ModalStore";
import YieldModal from "@components/modal/yieldModal";
function Index() {
  const yieldModal = useModal(YieldModalAtom);
  return (
    <>
      <TopBar></TopBar>
      <div className="yield-container">
        <div className="yield-contents">
          <div className="yield-title-container">
            <span>YIELD OPPORTUNITIES</span>
            <span>list description and overview.</span>
          </div>

          <PoolCard
            poolTitle={"Cauris Fund #4: Africa Innovation Pool"}
            poolDescription={"Fintech loans in Africa"}
            unitranche={true}
            poolStat={"12.15% USDC"}
            poolSubstat={"19.28% with GFI"}
            poolState={"yield"}
            poolIcon={logo.src}
            onClick={() => {
              yieldModal.open();
            }}
          />
          <PoolCard
            poolTitle={"Cauris Fund #3: Africa Innovation Pool"}
            poolDescription={"Africa multi-sector loans"}
            unitranche={false}
            poolStat={"17.00% USDC"}
            poolSubstat={"23.99% with GFI"}
            poolState={"closed"}
            poolIcon={logo.src}
            onClick={() => {
              yieldModal.open();
            }}
          />
          <PoolCard
            poolTitle={"Cauris Fund #4: Africa Innovation Pool"}
            poolDescription={"Fintech loans in Africa"}
            unitranche={true}
            poolStat={"12.15% USDC"}
            poolSubstat={"19.28% with GFI"}
            poolState={"yield"}
            poolIcon={logo.src}
            onClick={() => {
              yieldModal.open();
            }}
          />
          <PoolCard
            poolTitle={"Cauris Fund #4: Africa Innovation Pool"}
            poolDescription={"Fintech loans in Africa"}
            unitranche={true}
            poolStat={"12.15% USDC"}
            poolSubstat={"19.28% with GFI"}
            poolState={"yield"}
            poolIcon={logo.src}
            onClick={() => {
              yieldModal.open();
            }}
          />

          <div className="yield-disclaimer-container">
            <div className="d-item1">
              {" "}
              <PortalIcons selected={false} icon={"general info"}></PortalIcons>
            </div>
            <div className="d-item2">DISCLAIMER</div>
            <div className="d-item3">
              {" "}
              A disclaimer is generally any statement intended to specify or
              delimit the scope of rights and obligations that may be exercised
              and enforced by parties in a legally recognized relationship.
            </div>
          </div>
        </div>
      </div>
      <YieldModal
        isOpen={yieldModal.isOpen}
        onClose={() => yieldModal.close()}
      ></YieldModal>
    </>
  );
}

export default Index;
