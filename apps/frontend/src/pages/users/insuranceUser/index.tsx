import { PortalIcons } from "@components/icons";
import TalModal from "@components/modal/talModal";
import TopBar from "@components/topBar";
import { Button } from "taral-ui";
import { useModal } from "@utils/hooks";
import { TalModalAtom } from "@store/ModalStore";

function Index() {
  const talModal = useModal(TalModalAtom);
  return (
    <>
      <TopBar></TopBar>
      <div className="insurance-container">
        <div className="insurance-contents">
          <div className="insurance-title-container">
            <span>PAGE TITLE</span>
            <span>page description and overview.</span>
          </div>
          <div className="insurance-balance-container">
            <div className="available-balance">
              <div className="balance">AVAILABLE BALANCE</div>
            </div>
            <div className="tal-balance">
              <span>1,483.406843</span>
              <span>TAL</span>
            </div>
            <div className="st-tal-balance">
              <span>0.00</span>
              <span>stTAL</span>
            </div>
          </div>
          <div className="insurance-tal-container">
            <div className="icon-container">
              <PortalIcons selected={false} icon={"tal icon"}></PortalIcons>
            </div>
            <div className="lock-tal-container">
              <div className="lock-tal-stTal">
                <span>stTal</span>
                <span>0.00</span>
                <span>1 stTAL ≈ 1.976385 TAL</span>
              </div>
              <div className="lock-tal-Tal">
                <span>TAL</span>
                <span>0.00</span>
                <span>Cooldown status: Not started</span>
              </div>
              <div className="lock-tal-APR">
                <span>Current APR</span>
                <span>9.45%</span>
              </div>
              <div className="lock-tal-button">
                <Button
                  label={"Lock TAL"}
                  onClick={() => {
                    talModal.open();
                  }}
                ></Button>
              </div>
            </div>
          </div>
          <div className="insurance-unstacked-container">
            <span>Unstacked LP Tokens</span>
            <span>
              We noticed that your wallet contains LP Tokens that are not
              stacked yet. If you want to stake them, pick the appropriate token
              in the table, hit Lock TAL and choose Stake LP to initiate
              staking.
            </span>
          </div>
        </div>
        <div className="insurance-info">
          <div className="insurance-info-icon">
            <PortalIcons selected={false} icon={"exclamation"}></PortalIcons>
          </div>
          <div className="insurance-info-title">
            <span>How locking works</span>
          </div>
          <div className="insurance-info-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              ultrices, purus eu aliquet ultricies, nibh dui rhoncus ex, a
              commodo nunc neque eleifend metus. Nunc ultrices lobortis leo sed
              lacinia. Donec ut molestie ante. Suspendisse potenti. Donec
              faucibus hendrerit leo eu blandit:
            </p>
            <ul>
              <li>
                Praesent maximus, dui ac pretium egestas, massa enim euismod
                neque, sit amet placerat neque neque a lectus.
              </li>
              <li>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </li>
              <li>
                Aliquam dapibus leo quis nisl tristique, sed condimentum tortor
                placerat.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                tempor quis tortor non convallis.
              </li>
              <li>
                Aliquam enim leo, ullamcorper id vulputate nec, maximus quis
                orci.
              </li>
              <li>Duis molestie felis a est convallis imperdiet.</li>
            </ul>
            <p>
              Phasellus feugiat urna neque, non sodales sem pulvinar ultricies.
              Phasellus sagittis gravida mauris, a euismod eros semper quis.{" "}
            </p>
          </div>
        </div>
      </div>
      <TalModal
        isOpen={talModal.isOpen}
        onClose={() => talModal.close()}
      ></TalModal>
    </>
  );
}

export default Index;
