import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { Button } from "taral-ui";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { X } from "react-feather";

function Index() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      products: [{ name: "", quantity: 0, unitPrice: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const onSubmit = (data: any) => console.log("data", data);

  return (
    <ApplicationLayout>
      <div className="ptContainer">
        <div className="productContainer">
          <div className="maintitle">PRODUCTS</div>
          {fields.map((item, index) => {
            return (
              <div key={item.id} className="selectBack">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="maintitle">
                    <span>PRODUCT {index + 1}</span>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <X onClick={() => remove(index)}></X>
                  </div>
                </div>

                <div className="rowBox">
                  <div className="inputContainer">
                    <span>Product Name</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Product name..."
                      {...register(`products.${index}.name`, {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Quantity</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Quantity..."
                      {...register(`products.${index}.quantity`, {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="inputContainer">
                    <span>Unit Price</span>
                    <input
                      type="text"
                      className="inputs"
                      placeholder="Price..."
                      {...register(`products.${index}.unitPrice`, {
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <Button
            label={"+ Add Product"}
            onClick={() => {
              append({ name: "", quantity: 0, unitPrice: 0 });
            }}
          ></Button>
        </div>
        <div className="vLine"></div>
        <div className="portContainer">
          <div className="maintitle">PORTS</div>
          <div className="inputContainer">
            <span>Port of Export</span>
            <input
              type="text"
              className="inputs"
              placeholder="Search ports..."
            />
          </div>
          <div className="inputContainer">
            <span>Port of Import</span>
            <input
              type="text"
              className="inputs"
              placeholder="Search ports..."
            />
          </div>
        </div>
      </div>
      <BottomBar onSubmit={handleSubmit(onSubmit)}></BottomBar>
    </ApplicationLayout>
  );
}

export default Index;
