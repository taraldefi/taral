import React, { useState } from "react";
import ComplianceLayout from "@components/layouts/auditor/compliance_layout";
import { Button, PersonsTable } from "@lib";
import { useForm } from "react-hook-form";
import { PortalIcons } from "@components/icons";
import { tableFormPerson } from "src/types";

const TableData: tableFormPerson[] = [
  {
    name: "Cameron Williamson",
    image: "/assets/images/1.png",
    email: "Email@company.com",
    position: "Marketing Specialist",
    isSent: false,
    isDone: true,
  },
  {
    name: "Cameron Williamson",
    image: "/assets/images/2.png",
    email: "Email@company.com",
    position: "Public Representative",
    isSent: true,
    isDone: true,
  },
  {
    name: "Cameron Williamson",
    image: "/assets/images/3.png",
    email: "Email@company.com",
    position: "Public Representative",
    isSent: true,
    isDone: false,
  },
  {
    name: "Cameron Williamson",
    image: "/assets/images/4.png",
    email: "Email@company.com",
    position: "Marketing Specialist",
    isSent: false,
    isDone: true,
  },
];
function Company() {
  const x: number = Object.keys(TableData).length;
  const [fields, setFields] = useState<tableFormPerson[]>(TableData);
  const { register, handleSubmit, reset } = useForm<tableFormPerson>();
  const onSubmit = handleSubmit((data) => {
    setFields([data!, ...fields]);
    reset();
  });

  return (
    <ComplianceLayout showexport={true}>
      <div className="personsTable">
        <div className="persons">
          <span className="title">ADD NEW</span>
          <form onSubmit={onSubmit} className="complianceAddBox" action="">
            <div className="name">
              <span>Person Name</span>

              <input
                {...register("name")}
                placeholder="Name..."
                type="text"
                className="inputs"
              />
            </div>
            <div className="email">
              <span>Email</span>
              <input
                {...register("email")}
                placeholder="Email..."
                type="email"
                className="inputs"
              ></input>
            </div>
            <div className="position">
              <span>Position</span>
              <input
                {...register("position")}
                placeholder="Position or role..."
                type="text"
                className="inputs"
              ></input>
            </div>
            <div className="verificationStatus">
              <span>Verification status</span>
              <div className="verificationBox">
                <input
                  {...register("isSent")}
                  type="checkBox"
                  className="check"
                ></input>
                <span>Sent</span>
              </div>
            </div>
            <div className="statusVerification">
              <span>Status verification</span>
              <div className="verificationBox">
                <input
                  {...register("isDone")}
                  type="checkBox"
                  className="check"
                ></input>
                <span>Done</span>
              </div>
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
      <div className="table">
        <div className="taskBox">
          <span>{x} PERSONS</span>
        </div>
        <div className="persons--table">
          <PersonsTable personsTableData={fields} />
        </div>
      </div>
    </ComplianceLayout>
  );
}

export default Company;
