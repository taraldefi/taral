import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { Button } from "taral-ui";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { X } from "react-feather";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import * as Yup from "yup";
import { CreateOrderDetail } from "src/types/order_details";
import buyerApplicationService from "@services/application/buyerApplicationService";
import { toast } from "sonner";

const schemaValidation = Yup.object().shape({
  exportPort: Yup.string().required("Required"),
  importPort: Yup.string().required("Required"),
  products: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        quantity: Yup.number().required("Required"),
        unitPrice: Yup.number().required("Required"),
      })
    )
    .min(1),
});

function Index({ ...props }) {
  const router = useRouter();
  const entityID = props.query.entityId;
  const applicationID = props.query.applicationId;
  const [updateMode, setUpdateMode] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderDetail>({
    defaultValues: {
      exportPort: "",
      importPort: "",
      products: [{ name: "", quantity: 0, unitPrice: 0 }],
    },
  });

  const getInitialData = async () => {
    console.log("applicationID", applicationID);
    const initialData: CreateOrderDetail = {
      exportPort: "",
      importPort: "",
      products: [{ name: "", quantity: 0, unitPrice: 0 }],
    };

    try {
      // Attempt to fetch buyer info from the backend
      const response = await buyerApplicationService.getOrderDetailInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }

      // If successful, use the fetched data for the form
      return response;
    } catch (error) {
      return initialData; // or return some default data if needed
    }
  };

  const saveChangeToDatabase = async (args: CreateOrderDetail) => {
    console.count("payload for patch:" + JSON.stringify(args));
    if (!updateMode) {
      const createOrderInfo = buyerApplicationService.createOrderInfo(
        applicationID as string,
        args
      );
      toast.promise(createOrderInfo, {
        loading: "Loading...",
        success: (data) => {
          setUpdateMode(true);
          return `buyer information created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
      const response = await createOrderInfo;

      return response;
    } else {
      const createOrderInfo = buyerApplicationService.updateOrderInfo(
        applicationID as string,
        args
      );
      toast.promise(createOrderInfo, {
        loading: "Loading...",
        success: (data) => {
          return `buyer information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
      const response = await createOrderInfo;

      return response;
    }
  };

  console.log("errors", errors);
  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1 },
    control,
    name: "products",
  });
  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/supplierInfo`
    );
  };
  // TODO: create an order first, then add products to it
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
              {...register(`exportPort`, { required: true })}
            />
          </div>
          <div className="inputContainer">
            <span>Port of Import</span>
            <input
              type="text"
              className="inputs"
              placeholder="Search ports..."
              {...register(`importPort`, { required: true })}
            />
          </div>
          {Object.keys(errors).length != 0 && (
            <span className="errorMessage">
              Please fill all the required fields to continue
            </span>
          )}
        </div>
      </div>
      <BottomBar onBack={onBack} onSubmit={handleSubmit(onSubmit)}></BottomBar>
    </ApplicationLayout>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}
export default Index;
