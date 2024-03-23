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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const entityRegistrationSchema = Yup.object().shape({
  logo: Yup.mixed<FileList>()
    .test("required", "You need to provide a logo", (file) => {
      if (file && file[0]) return true;
      return false;
    })
    .test("fileSize", "Uploaded file is too large", (file) => {
      //less than 2MB file size
      console.log(file && file[0] && file[0].size);
      return file && file[0] && file[0].size <= 2000000;
    }),

  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required(),
  registrationNumber: Yup.string().required(),
  beneficialOwner: Yup.string().required(),
  abbreviation: Yup.string().required(),
  nationality: Yup.string().required(),
  headquarters: Yup.string().required(),
  industryType: Yup.string().required(),
  coreBusiness: Yup.string().required(),
  incorporationDate: Yup.string().required(),
  legalForm: Yup.string().required(),
  taxAndRevenueFiscalYear: Yup.number().required(),
  taxAndRevenueTotalRevenue: Yup.number().required(),
});

function FormModal({ isOpen, onClose }: Props) {
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(entityRegistrationSchema),
  });
  const [, setCurrentSelectedEntity] = useAtom(currentSelectedEntityAtom);
  const [, setEntityCreated] = useAtom(EntityCreatedAtom);
  const router = useRouter();
  const [previewSource, setPreviewSource] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [fileName, setFileName] = React.useState<string>("");

  const onSubmit = (data: Partial<Entity>) => {
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
        setFileName("");
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

  console.log(errors);

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
                  accept="image/png, image/jpeg"
                  {...register("logo")}
                  title="entity logo"
                  id="upload"
                  className={errors.logo ? "inputsRed" : "inputs"}
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
                  // eslint-disable-next-line @next/next/no-img-element
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
                  className={errors.email ? "inputsRed" : "inputs"}
                  type="email"
                  placeholder="john@example.com"
                ></input>
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Entity Name</span>
                  <input
                    {...register("name")}
                    className={errors.name ? "inputsRed" : "inputs"}
                    type="text"
                    placeholder="Entity Name..."
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Abbreviation</span>
                  <input
                    {...register("abbreviation")}
                    className={errors.abbreviation ? "inputsRed" : "inputs"}
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
                        border: `${
                          errors.phoneNumber
                            ? "1.5px solid #f84141"
                            : "1px solid #cbd5e1"
                        }`,
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
                    className={
                      errors.taxAndRevenueFiscalYear ? "inputsRed" : "inputs"
                    }
                    type="number"
                    placeholder="Year"
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Total Revenue</span>
                  <input
                    {...register("taxAndRevenueTotalRevenue")}
                    className={
                      errors.taxAndRevenueTotalRevenue ? "inputsRed" : "inputs"
                    }
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
                    className={errors.beneficialOwner ? "inputsRed" : "inputs"}
                    type="text"
                    placeholder="Beneficial Owner..."
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Registration Number</span>
                  <input
                    {...register("registrationNumber")}
                    className={
                      errors.registrationNumber ? "inputsRed" : "inputs"
                    }
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
                    className={errors.nationality ? "inputsRed" : "inputs"}
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
                    className={errors.headquarters ? "inputsRed" : "inputs"}
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
                    className={errors.coreBusiness ? "inputsRed" : "inputs"}
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
                    className={errors.industryType ? "inputsRed" : "inputs"}
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
                    className={
                      errors.incorporationDate ? "inputsRed" : "inputs"
                    }
                    type="date"
                    placeholder="Select Date..."
                  ></input>
                </div>
                <div className="entityfield">
                  <span>Legal Form</span>
                  <select
                    id="downarrow"
                    className={errors.legalForm ? "inputsRed" : "inputs"}
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
                    <option value={"limited liability corporation"} key="4">
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
