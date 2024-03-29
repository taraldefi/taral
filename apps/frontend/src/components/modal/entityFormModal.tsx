import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { countries, industries } from "@utils/lib/constants";
import { Controller, useForm } from "react-hook-form";
import entityService from "@services/entityService";
import { Entity } from "src/types";
import { useRouter } from "next/router";
import {
  EntityCreatedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import "react-international-phone/style.css";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { PhoneInput } from "react-international-phone";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FormModal({ isOpen, onClose }: Props) {
  const [, setSelectedCountry] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = React.useState(false);
  const { register, handleSubmit, reset, control } = useForm<Entity>();
  const [, setCurrentSelectedEntity] = useAtom(currentSelectedEntityAtom);
  const [, setEntityCreated] = useAtom(EntityCreatedAtom);
  const router = useRouter();
  const [previewSource, setPreviewSource] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [fileName, setFileName] = React.useState<string>("");

  const onSubmit = (data: Entity) => {
    setLoading(true);
    const formData = new FormData();
    console.log("data", data);

    Object.entries(data).forEach(([key, value]) => {
      if (key === "taxAndRevenueFiscalYear") {
        formData.append("taxAndRevenue[lastFiscalYear]", value);
      } else if (key === "taxAndRevenueTotalRevenue") {
        formData.append("taxAndRevenue[totalRevenue]", value);
      } else if (key === "logo") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = () => entityService.createEntity(formData);

    toast.promise(response, {
      loading: "Loading...",
      success: (data) => {
        setCurrentSelectedEntity(data.id);
        setLoading(false);
        setSubmitSuccessful(true);
        setEntityCreated(data.id);
        onClose();
        router.push(
          `/users/${router.asPath.split("/")[2]}/entities/${data.id}/overview`
        );
        return `${data.name} entity has been created`;
      },
      error: (err) => {
        return `${err.message}`;
      },
    });

    onClose();
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewSource(reader.result);
      };

      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setPreviewSource("");
    }
  };

  // Clear field values on submission is successful
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className={"formModal " + (isOpen && "active")}>
      {isOpen && (
        <div className="modalMenue">
          <div
            onClick={() => {
              onClose();
            }}
            className="close"
          >
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </div>
          <div className="header">
            Add New Entity
            <span className="subtitle">
              Fill the form below to add a new entity to the list of entities.
            </span>
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="formContent">
              <span className="label">entity information</span>
              <div className="entityfield">
                <span>Entity Logo</span>
                <input
                  {...register("logo", { required: true })}
                  title="entity logo"
                  id="upload"
                  className="inputs"
                  type="file"
                  placeholder="Upload Logo..."
                  onChange={handleFileChange}
                ></input>
                {fileName && (
                  <input
                    type="text"
                    className="inputs"
                    value={fileName}
                    readOnly
                    placeholder="File Name"
                    style={{ marginTop: "5px" }}
                  />
                )}
                {previewSource && (
                  <img
                    id="preview"
                    src={previewSource as string}
                    alt="Preview"
                    style={{
                      display: "block",
                      maxWidth: "100px",
                      maxHeight: "100px",
                      padding: "5px",
                      margin: "auto",
                    }}
                  />
                )}
              </div>
              <div className="entityfield">
                <span>Email</span>
                <input
                  {...register("email")}
                  title="email"
                  className="inputs"
                  type="email"
                  placeholder="john@example.com"
                ></input>
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Entity Name</span>
                  <input
                    {...register("name")}
                    className="inputs"
                    type="text"
                    placeholder="Entity Name..."
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Abbreviation</span>
                  <input
                    {...register("abbreviation")}
                    className="inputs"
                    type="text"
                    placeholder="Abbreviation..."
                  ></input>
                </div>
              </div>
              <div className="entityfield">
                <span>Phone Number</span>
                {/* <input
                type="text"
                className={
                  errors.company?.companyName ? "inputs inputRed" : "inputs"
                }
                placeholder="Contact number..."
                {...register("company.phoneNumber")}
              /> */}
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <PhoneInput
                      inputStyle={{
                        width: "100%",
                        height: "44px",
                        border: `1.5px solid #cbd5e1`,
                      }}
                      placeholder={"phone number"}
                      defaultCountry="us"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Last fiscal year</span>
                  <input
                    {...register("taxAndRevenueFiscalYear")}
                    className="inputs"
                    type="number"
                    placeholder="Year"
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Total Revenue</span>
                  <input
                    {...register("taxAndRevenueTotalRevenue")}
                    className="inputs"
                    type="number"
                    placeholder="Total Revenue"
                  ></input>
                </div>
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Beneficial Owner</span>
                  <input
                    {...register("beneficialOwner")}
                    className="inputs"
                    type="text"
                    placeholder="Beneficial Owner..."
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Registration Number</span>
                  <input
                    {...register("registrationNumber")}
                    className="inputs"
                    type="text"
                    placeholder="Registration Number"
                  ></input>
                </div>
              </div>

              <div className="flexrow">
                <div className="entityfield">
                  <span>UBO Nationality</span>
                  <select
                    {...register("nationality")}
                    id="downarrow"
                    className="inputs"
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select country...</option>
                    {countries.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="entityfield">
                  <span>Headquarters Location</span>
                  {/* <select
                  id="downarrow"
                  className="inputs"
                  {...register("headquarters")}
                >
                  <option value="">Select Location...</option>
                  {cities
                    .filter(
                      (item) => item.country === selectedCountry.toUpperCase()
                    )
                    .map((item) => {
                      return (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                </select> */}
                  <input
                    {...register("headquarters")}
                    className="inputs"
                    type="text"
                    placeholder="City"
                  ></input>
                </div>
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Core Business</span>
                  <select
                    id="downarrow"
                    className="inputs"
                    {...register("coreBusiness")}
                  >
                    <option value="">Core Business...</option>
                    {industries.map((item) => {
                      return (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="entityfield">
                  <span>Industry Type</span>
                  <input
                    {...register("industryType")}
                    className="inputs"
                    type="text"
                    placeholder="Industry Type..."
                  ></input>
                </div>
              </div>

              <div className="flexrow">
                <div className="entityfield">
                  <span>Incorporation Date</span>
                  <input
                    {...register("incorporationDate")}
                    id="calendar"
                    className="inputs"
                    type="date"
                    placeholder="Select Date..."
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Legal Form</span>
                  <select
                    id="downarrow"
                    className="inputs"
                    {...register("legalForm")}
                  >
                    <option key="0" value={""} selected>
                      Select Form...
                    </option>
                    <option value={"sole proprietorship"} key="1">
                      Sole proprietorship
                    </option>
                    <option value={"partnership"} key="2">
                      Partnership
                    </option>
                    <option value={"corporation"} key="3">
                      Corporation
                    </option>
                    <option value={"limited liability corporation"} key="3">
                      Limited Liability Corporation
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <button className="button" type="submit">
                {"Create Entity"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormModal;
