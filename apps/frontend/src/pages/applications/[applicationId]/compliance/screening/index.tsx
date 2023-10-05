import { PortalIcons } from "@components/icons";
import ComplianceLayout from "@components/layouts/auditor/compliance_layout";
import { Button, ScreeningTable } from "taral-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { tableFormScreening } from "src/types/form";

const TableData: tableFormScreening[] = [
  {
    persons: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    persons: "Adverse Media",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    persons: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    persons: "Adverse Media",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    persons: "Adverse Media",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
];

function Company() {
  const [fields, setFields] = useState<tableFormScreening[]>(TableData);
  const { register, handleSubmit, reset } = useForm<tableFormScreening>();
  const onSubmit = handleSubmit((data) => {
    setFields([data!, ...fields]);
    reset();
  });
  return (
    <ComplianceLayout showexport={true}>
      <div className="personsTable">
        <div className="persons">
          <span className="title">ADD NEW</span>
          <form onSubmit={onSubmit} action="" className="complianceAddBox">
            <div className="name">
              <span>Person</span>
              <input
                {...register("persons")}
                placeholder="Name..."
                type="text"
                className="inputs"
              />
            </div>
            <div className="hit">
              <span>Hit</span>
              <input
                {...register("Hit")}
                placeholder="Hit..."
                type="text"
                className="inputs"
              ></input>
            </div>
            <div className="position">
              <span>Source</span>
              <input
                {...register("Source")}
                placeholder="Add link..."
                type="text"
                className="inputs"
              ></input>
            </div>

            <div className="buttonContainer">
              <Button
                primary={true}
                backgroundColor="#1AB98B"
                icon={<PortalIcons selected={false} icon={"add"}></PortalIcons>}
                label="Add"
              ></Button>
            </div>
          </form>
        </div>
      </div>

      <div className="screening--table">
        <span className="title" style={{ fontSize: "13.5px" }}>
          OUTLETS
        </span>
        <br />
        <br />
        <ScreeningTable screeningTableData={fields}></ScreeningTable>
      </div>
    </ComplianceLayout>
  );
}

export default Company;
