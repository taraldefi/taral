import { PortalIcons } from "@components/icons";
import ResearchLayout from "@components/layouts/rs_layout";
import { Button, ResearchTable } from "taral-ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { tableFormResearch } from "src/types";

const TableData: tableFormResearch[] = [
  {
    name: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    name: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    name: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    name: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
  {
    name: "Watch List",
    Hit: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Source: "http://www.google.com",
  },
];

function Research() {
  const [fields, setFields] = useState<tableFormResearch[]>(TableData);
  const { register, handleSubmit, reset } = useForm<tableFormResearch>();
  const onSubmit = handleSubmit((data) => {
    setFields([data!, ...fields]);
    reset();
  });
  return (
    <>
      <ResearchLayout showexport={true}>
        <div className="personsTable">
          <div className="persons">
            <span className="title">ADD NEW</span>
            <form onSubmit={onSubmit} action="" className="complianceAddBox">
              <div className="name">
                <span>Person</span>
                <input
                  {...register("name")}
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
                  icon={
                    <PortalIcons selected={false} icon={"add"}></PortalIcons>
                  }
                  label="Add"
                ></Button>
              </div>
            </form>
          </div>
        </div>
        <ResearchTable researchTableData={fields}></ResearchTable>
      </ResearchLayout>
    </>
  );
}

export default Research;
