import { useAtom } from "jotai";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { activityStatusAtom, remainingIdleTimeAtom } from "@store/ModalStore";
const timeout = 35000;
const promptBeforeIdle = 10000;

export default function IdleTimeOut() {
  const [state, setState] = useAtom(activityStatusAtom);
  const [remaining, setRemaining] = useAtom(remainingIdleTimeAtom);

  const [open, setOpen] = useState<boolean>(false);
  console.log(remaining, state);
  const onIdle = () => {
    setState("Idle");
    setOpen(false);
  };

  const onActive = () => {
    setState("Active");
    setOpen(false);
  };

  const onPrompt = () => {
    setState("Prompted");
    setOpen(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    timeout,
    promptBeforeIdle,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  const handleStillHere = () => {
    activate();
  };

  if (remaining === 0) {
    signOut();
  }

  const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0);
  const seconds = timeTillPrompt > 1 ? "seconds" : "second";

  return (
    <>
      <div className={"tariala--modal " + (open && "active")}>
        {open && (
          <div className="modal--menue">
            <div className="header">
              You Have Been Idle!
              <span className="subtitle">
                Your session is expiring. You have {remaining} seconds left
              </span>
            </div>
            <div className="form">
              <button className="button--edit" onClick={handleStillHere}>
                Continue Session
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
