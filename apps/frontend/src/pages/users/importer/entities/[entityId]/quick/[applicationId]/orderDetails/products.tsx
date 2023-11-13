import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { X } from "react-feather";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "taral-ui";
import * as Yup from "yup";
import useOrderDetailForm from "@hooks/buyerApplication/useOrderDetails";
import buyerApplicationService from "@services/application/buyerApplicationService";
import { toast } from "sonner";
import { CreateProduct, Product } from "src/types/order_details";

type Props = {
  applicationId: string;
  sendProductData: (data: any) => void;
};

type ProductForm = {
  products?: Product[];
};

const AddProductForm = ({
  applicationId,
  appendFunction,
  messengerFunction,
}: any) => {
  const { createProductSchemaValidation } = useOrderDetailForm(applicationId);
  const {
    register: registerProduct,

    reset: productReset,
    trigger: productTrigger,
    handleSubmit: productHandleSubmit,
    formState: { errors: productErrors },
  } = useForm<CreateProduct>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(createProductSchemaValidation),
  });

  const handAddProduct: SubmitHandler<CreateProduct> = async (data) => {
    // !!!NOTE!!!: optimal and more efficient way would be to show a pop up to fill in individual product details
    // but for now we are just creating a product with default values
    //if needed set a limit here
    // await productTrigger();
    console.log(data);

    const createProduct = buyerApplicationService.createProductInfo(
      applicationId,
      {
        name: data.name,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
      }
    );
    toast.promise(createProduct, {
      loading: "Loading...",
      success: (data) => {
        return `${data.name} created`;
      },
      error: (err) => {
        return `${err}`;
      },
    });
    const response = await createProduct;
    appendFunction(response);
    // send products data to parent component for validation check after adding a new product
    messengerFunction();

    productReset();
  };

  return (
    <>
      <form
        onSubmit={productHandleSubmit(handAddProduct)}
        className="selectBack"
      >
        <div className="rowBox">
          <div className="inputContainer">
            <span style={{ display: "flex", flexDirection: "row" }}>
              Product Name <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              type="text"
              className={productErrors?.name ? "inputs inputRed" : "inputs"}
              placeholder={
                productErrors?.name ? productErrors?.name?.message : "name"
              }
              {...registerProduct(`name`)}
            />
          </div>
          <div className="inputContainer">
            <span style={{ display: "flex", flexDirection: "row" }}>
              Quantity <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              className={productErrors?.quantity ? "inputs inputRed" : "inputs"}
              placeholder={
                productErrors?.quantity ? "quantity required" : "quantity"
              }
              {...registerProduct(`quantity`)}
            />
          </div>
          <div className="inputContainer">
            <span style={{ display: "flex", flexDirection: "row" }}>
              Unit Price <b style={{ color: "#f84141" }}>*</b>
            </span>
            <input
              className={
                productErrors?.unitPrice ? "inputs inputRed" : "inputs"
              }
              placeholder={
                productErrors?.unitPrice ? "price required" : "price"
              }
              {...registerProduct(`unitPrice`)}
            />
          </div>
        </div>
        <button
          style={{
            width: "30%",
            marginTop: "20px",
            backgroundColor: "white",
            border: "#475569 solid 1px",
            fontSize: "14px",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "10px 20px",
            color: "#475569",
          }}
          type="submit"
        >
          {"+ Add Product"}
        </button>
      </form>
    </>
  );
};

const ProductsForm = ({ applicationId, sendProductData }: Props) => {
  const {
    productSchemaValidation,
    productQueryResult,
    handleDebouncedProductChange,
    singleProductSchemaValidation,
  } = useOrderDetailForm(applicationId);
  const {
    control,
    register,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ProductForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(productSchemaValidation),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const handleSendDataToParent = async () => {
    const data = getValues();
    console.log("send function working", data);
    await trigger();
    sendProductData(data); // Call the parent component's callback function to send data to the parent
  };

  const handleDeleteProduct = (index: number, id: string) => {
    const data = getValues();
    // prevent user from deleting all products

    const deleteProduct = buyerApplicationService.deleteProductInfo(
      applicationId,
      id
    );
    toast.promise(deleteProduct, {
      loading: "Loading...",
      success: (data) => {
        return `product deleted`;
      },
      error: (err) => {
        return `${err}`;
      },
    });
    remove(index);
    // send products data to parent component for validation check after deleting a product
    handleSendDataToParent();
  };
  // individual product validation and updation handler
  const onProductChange = async (id: string) => {
    const data = getValues();
    // find the product user edited
    console.log(
      data,
      id,
      data.products?.find((item) => item.id === id)
    );
    try {
      // validate products as a whole
      //await productSchemaValidation.validate(data);
      // validate the individual product user edited
      const validated = await singleProductSchemaValidation.validate(
        data.products?.find((item) => item.id === id)
      );
      console.log("validations:", validated);
      handleDebouncedProductChange(validated);
      // send products data to parent component for validation check after editing a product
      handleSendDataToParent();
    } catch (e) {
      toast.error(`${e}`);
      console.log(e);
    }
  };

  React.useEffect(() => {
    reset(productQueryResult.data);
    handleSendDataToParent();
    // const progress = calculateProgress();
    // setProgress(parseInt(progress));
  }, [productQueryResult.data]);
  return (
    <div className="productContainer">
      <div className="maintitle">ADD PRODUCT</div>
      <AddProductForm
        applicationId={applicationId}
        appendFunction={append}
        messengerFunction={handleSendDataToParent}
      />
      <div className="maintitle">PRODUCTS</div>
      {fields.length === 0 && <div>No products added</div>}
      {fields.map((item, index) => {
        return (
          <form
            onChange={() => {
              const id = getValues(`products.${index}.id`);
              onProductChange(id as string);
            }}
            key={item.id}
            className="selectBack"
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="maintitle">
                <span>PRODUCT {index + 1}</span>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <X
                  onClick={() =>
                    handleDeleteProduct(
                      index,
                      getValues(`products.${index}.id`) as string
                    )
                  }
                ></X>
              </div>
            </div>

            <div className="rowBox">
              <div className="inputContainer">
                <span style={{ display: "flex", flexDirection: "row" }}>
                  Product Name <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  className={
                    errors.products?.[index]?.name
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.products?.[index]?.name
                      ? errors?.products?.[index]?.name?.message
                      : "name"
                  }
                  {...register(`products.${index}.name`)}
                />
              </div>
              <div className="inputContainer">
                <span style={{ display: "flex", flexDirection: "row" }}>
                  Quantity <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  className={
                    errors.products?.[index]?.quantity
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.products?.[index]?.quantity
                      ? "quantity required"
                      : "quantity"
                  }
                  {...register(`products.${index}.quantity`)}
                />
              </div>
              <div className="inputContainer">
                <span style={{ display: "flex", flexDirection: "row" }}>
                  Unit Price <b style={{ color: "#f84141" }}>*</b>
                </span>
                <input
                  className={
                    errors.products?.[index]?.unitPrice
                      ? "inputs inputRed"
                      : "inputs"
                  }
                  placeholder={
                    errors.products?.[index]?.unitPrice
                      ? "price required"
                      : "price"
                  }
                  {...register(`products.${index}.unitPrice`)}
                />
              </div>
            </div>
          </form>
        );
      })}
    </div>
  );
};

export default ProductsForm;
