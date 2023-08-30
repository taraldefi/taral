import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Entity, EntityResponse } from "src/types";
import { countries, industries } from "@utils/lib/constants";
import entityService from "@services/entityService";
import useModal from "@hooks/useModal";
import { EditFormModalAtom } from "@store/ModalStore";
import { EntityEditedAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import convertDate from "@utils/lib/convertDate";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function compareEntities(entity1: Entity, entity2: Entity): Partial<Entity> {
  const changedFields: Partial<Entity> = {};

  for (const key in entity1) {
    if (entity1.hasOwnProperty(key) && entity2.hasOwnProperty(key)) {
      if (entity1[key as keyof Entity] !== entity2[key as keyof Entity]) {
        changedFields[key as keyof Entity] = entity2[key as keyof Entity];
      }
    }
  }

  return changedFields;
}

function FormEditModal({ isOpen, onClose }: Props) {
  const [, setSelectedCountry] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const { entityId } = useModal(EditFormModalAtom);
  const [, setEntityEdited] = useAtom(EntityEditedAtom);
  const [data, setData] = React.useState<EntityResponse>();
  const { register, handleSubmit, reset } = useForm<EntityResponse>({
    defaultValues: data,
    mode: "onChange",
  });
  console.log(entityId, data);
  React.useEffect(() => {
    if (entityId) {
      const fetchData = async () => {
        const res = await entityService.getEntity(entityId);
        setData({
          ...res,
          incorporationDate: convertDate(res.incorporationDate),
        });
        reset({
          ...res,
          incorporationDate: convertDate(res.incorporationDate),
        });
      };
      fetchData();
    }
  }, [isOpen]);

  const onSubmit = (newData: Entity) => {
    setLoading(true);

    const updates = compareEntities(data!, newData);
    if (updates.logo) updates.logo = newData.logo[0];
    console.log(updates);
    console.log(entityId);
    if (entityId)
      entityService.updateEntity(entityId, updates).then((data) => {
        if (data.id) {
          console.log(data.id);
          setEntityEdited(JSON.stringify(data));
          onClose();
          setLoading(false);
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
            Edit {data && data?.name}
            <span className="subtitle">
              Edit entity info and properties from the form below.
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
                {isLoading ? <span>Saving...</span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormEditModal;
