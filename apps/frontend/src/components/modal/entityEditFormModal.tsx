import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useForm, useFormState } from "react-hook-form";
import { Entity, EntityResponse } from "src/types";
import { countries, industries } from "@utils/lib/constants";
import entityService from "@services/entityService";
import useModal from "@hooks/useModal";
import { EditFormModalAtom } from "@store/ModalStore";
import { EntityEditedAtom } from "@store/entityStore";
import { useAtom } from "jotai";
import convertDate from "@utils/lib/convertDate";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FormEditModal({ isOpen, onClose }: Props) {
  const [, setSelectedCountry] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const { entityId } = useModal(EditFormModalAtom);
  const [, setEntityEdited] = useAtom(EntityEditedAtom);
  const [data, setData] = React.useState<EntityResponse>();
  const { register, handleSubmit, reset, control } = useForm<Entity>({
    defaultValues: data,
    mode: "onChange",
  });
  const { dirtyFields } = useFormState({
    control,
  });
  const [previewSource, setPreviewSource] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [fileName, setFileName] = React.useState<string>("");

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

  const onSubmit = (newData: Entity) => {
    setLoading(true);
    newData.logo = newData.logo[0] || "";
    const formData = new FormData();
    Object.keys(dirtyFields).forEach((key) => {
      formData.append(key, newData[key as keyof Entity]);
    });

    for (const pair of formData.entries()) {
      console.log(pair[0] + " : " + pair[1]);
    }

    if (entityId) {
      const response = entityService.updateEntity(entityId, formData);
      toast.promise(response, {
        loading: "Loading...",
        success: (data) => {
          setEntityEdited(JSON.stringify(data));
          setLoading(false);
          onClose();

          return `${data.name} entity updated`;
        },
        error: (err) => {
          return `${err.message}`;
        },
      });
    }
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
            Edit {data && data.name}
            <span className="subtitle">
              Edit entity info and properties from the form below.
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
                  className="inputs"
                  type="email"
                  placeholder="john@example.com"
                ></input>
              </div>
              <div className="flexrow">
                <div className="entityfield">
                  <span>Entity Name</span>
                  <input
                    disabled
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
