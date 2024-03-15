import { Button } from "@lib";

type Props = {
  isOpen: boolean;
};

type NotificationItemProps = {
  title: string;
  dateTime: string;
  content: string;
};

const testData: NotificationItemProps[] = [
  {
    title: "Scheduled Maintenance",
    dateTime: "10:18pm Today",
    content:
      "We will be performing scheduled maintenance on our platform. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience caused.",
  },
  {
    title: "Enhanced Security Update",
    dateTime: "10:18pm Today",
    content:
      "We will be performing scheduled maintenance on our platform. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience caused.",
  },
  {
    title: "Platform Webinar Announcement",
    dateTime: "10:18pm Today",
    content:
      "We will be performing scheduled maintenance on our platform. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience caused.",
  },
  {
    title: "Server Upgrade Notice",
    dateTime: "10:18pm Today",
    content:
      "We will be performing scheduled maintenance on our platform. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience caused.",
  },
  {
    title: "Community Challenge: Win Prizes!",
    dateTime: "10:18pm Today",
    content:
      "We will be performing scheduled maintenance on our platform. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience caused.",
  },
  {
    title: "Scheduled Maintenance",
    dateTime: "10:18pm Today",
    content:
      "We will be performing scheduled maintenance on our platform. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience caused.",
  },
];
function NotificationModal({ isOpen }: Props) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={"settingsModal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modalMenue">
          <div className="header">
            Notifications
            <div className="lastItem">
              <Button onClick={() => {}} label={"View All"}></Button>
            </div>
          </div>
          <div className="notificationList">
            {testData.map((item, index) => {
              return (
                <div key={index} className="notificationItem">
                  <div className="notificationHeader">
                    <h3 className="notificationTitle">{item.title}</h3>
                    <span className="dateTime lastItem">{item.dateTime}</span>
                  </div>
                  <span className="content">{item.content}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationModal;
