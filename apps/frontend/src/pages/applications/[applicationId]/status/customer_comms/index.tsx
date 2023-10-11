import { Activity } from "taral-ui";
import StatusLayout from "@components/layouts/auditor/status_layout";
export default function CustomerComms() {
  return (
    <StatusLayout showexport={false}>
      {/* <Button title="New Task" onClick={() => console.log("clicked")}></Button>
      <br />
      <SecondButton
        title="View All Tasks"
        onClick={() => console.log("clicked")}
      ></SecondButton>
      <br />
      <Button
        title="New Message"
        onClick={() => console.log("clicked")}
      ></Button>
      <br />
      <SecondButton
        title="View All Messages"
        onClick={() => console.log("clicked")}
      ></SecondButton>
      <br />
      <ButtonIcon icon="add" title="Add" onClick={() => {}}></ButtonIcon> <br />
      <ButtonIcon icon="upload" title="Upload" onClick={() => {}}></ButtonIcon> */}
      <br />
      <br />
      <Activity
        user="Joergen Hoffman"
        activity="opened Exportfinanzierung mit HandEX"
        date="Oct 28th 2019 at 12:00 PM GMT +1"
        status={true}
      />
    </StatusLayout>
  );
}
