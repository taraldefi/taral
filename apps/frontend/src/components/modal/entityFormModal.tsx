import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { countries, industries } from "@utils/lib/constants";
import { useForm } from "react-hook-form";
import entityService from "@services/entityService";
import { Entity } from "src/types";
import { useRouter } from "next/router";
import {
  EntityCreatedAtom,
  currentSelectedEntityAtom,
} from "@store/entityStore";
import { useAtom } from "jotai";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FormModal({ isOpen, onClose }: Props) {
  const [, setSelectedCountry] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = React.useState(false);
  const { register, handleSubmit, reset } = useForm<Entity>();
  const [, setCurrentSelectedEntity] = useAtom(currentSelectedEntityAtom);
  const [, setEntityCreated] = useAtom(EntityCreatedAtom);
  const router = useRouter();

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

    for (let [key, value] of formData.entries()) {
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
                  {...register("logo")}
                  title="entity logo"
                  id="upload"
                  className="inputs"
                  type="file"
                  placeholder="Upload Logo..."
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
                <span>Beneficial Owner</span>
                <input
                  {...register("beneficialOwner")}
                  className="inputs"
                  type="text"
                  placeholder="Beneficial Owner..."
                ></input>
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Nationality</span>
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
                    placeholder="headquarter"
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
                      sole proprietorship
                    </option>
                    <option value={"partnership"} key="2">
                      partnership
                    </option>
                    <option value={"corporation"} key="3">
                      corporation
                    </option>
                  </select>
                </div>
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
