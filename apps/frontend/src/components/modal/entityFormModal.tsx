import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FormModal({ isOpen, onClose }: Props) {
  const [, setSelectedCountry] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm<Entity>();
  const [, setCurrentSelectedEntity] = useAtom(currentSelectedEntityAtom);
  const [, setEntityCreated] = useAtom(EntityCreatedAtom);
  const router = useRouter();

  const onSubmit = (data: Entity) => {
    setLoading(true);
    const formData = new FormData();
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      if (key === "logo") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    entityService.createEntity(formData).then((data) => {
      if (data.id) {
        console.log(data.id);
        setCurrentSelectedEntity(data.id);
        onClose();
        setLoading(false);
        setEntityCreated(data.id);
        router.push(
          `/users/${router.asPath.split("/")[2]}/entities/${data.id}/overview`
        );
      }
    });
  };
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
            <div>
              <button disabled={isLoading} className="button" type="submit">
                {isLoading ? <span>Creating Entity...</span> : "Create Entity"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormModal;
