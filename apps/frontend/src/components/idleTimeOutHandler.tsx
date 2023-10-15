import moment from "moment";
import React, { useEffect, useState } from "react";
import { IdleTimeOutModal } from "taral-ui";

interface IdleTimeOutHandlerProps {
  timeOutInterval?: number;
  onActive: () => void;
  onIdle: () => void;
  onLogout: () => void;
}

const IdleTimeOutHandler: React.FC<IdleTimeOutHandlerProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLogout, setLogout] = useState<boolean>(false);
  let timer: NodeJS.Timeout | undefined = undefined;
  const events: (keyof GlobalEventHandlersEventMap)[] = [
    "click",
    "load",
    "keydown",
    "drag",
    "mousemove",
    "mouseenter",
    "scroll",
  ];

  const eventHandler = () => {
    if (!isLogout) {
      localStorage.setItem("lastInteractionTime", moment().toString());
      if (timer) {
        props.onActive();
        startTimer();
      }
    }
  };

  useEffect(() => {
    addEvents();
    return () => {
      removeEvents();
      clearTimeout(timer);
    };
  }, []);

  const startTimer = () => {
    console.log(timer);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      const lastInteractionTime = localStorage.getItem("lastInteractionTime");
      const diff = moment.duration(moment().diff(moment(lastInteractionTime)));

      const timeOutInterval = props.timeOutInterval
        ? props.timeOutInterval
        : 10000;
      if (isLogout) {
        clearTimeout(timer);
      } else {
        if (diff.asMilliseconds() < timeOutInterval) {
          startTimer();
          props.onActive();
        } else {
          props.onIdle();
          setShowModal(true);
        }
      }
    }, 2000);
  };

  const addEvents = () => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });
    startTimer();
  };

  const removeEvents = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  const handleContinueSession = () => {
    //extend session
    setShowModal(false);
    setLogout(false);
  };

  const handleLogout = () => {
    removeEvents();
    clearTimeout(timer);
    setLogout(true);
    props.onLogout();
    setShowModal(false);
  };

  return (
    <div>
      <IdleTimeOutModal
        showModal={showModal}
        handleContinue={handleContinueSession}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default IdleTimeOutHandler;
