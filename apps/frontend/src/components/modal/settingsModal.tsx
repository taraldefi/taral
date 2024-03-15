import { Button } from "@lib";

type Props = {
  isOpen: boolean;
};
function SettingsModal({ isOpen }: Props) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={"settingsModal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modalMenue">
          <div className="header">
            Settings
            <div className="lastItem">
              <Button onClick={() => {}} label={"View All"}></Button>
            </div>
          </div>
          <div className="form">
            <div
              style={{ gap: "5px", display: "flex", flexDirection: "column" }}
            >
              <span>Currency</span>
              <select>
                <option value="">Select currency</option>
                <option value=""></option>
              </select>
            </div>
            <div
              style={{ gap: "5px", display: "flex", flexDirection: "column" }}
            >
              <span>Language</span>
              <select>
                <option value="">Select language...</option>
                <option value=""></option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsModal;
