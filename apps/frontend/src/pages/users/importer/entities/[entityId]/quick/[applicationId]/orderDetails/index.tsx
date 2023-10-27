import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { yupResolver } from "@hookform/resolvers/yup";
import useOrderDetailForm from "@hooks/buyerApplication/useOrderDetails";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { OrderDetails, Product } from "src/types/order_details";
import ProductsForm from "./products";

function Index({ ...props }) {
  const router = useRouter();
  const entityID = props.query.entityId;
  const applicationID = props.query.applicationId;
  const [productsData, setProductsData] = useState<any>([]);

  const handleChildData = (data: any) => {
    // Handle the data received from the child component (getValues)
    setProductsData(data);
    console.log("data from child", data);
  };

  const {
    schemaValidation,
    handleDebouncedChange,
    queryResult,
    productSchemaValidation,
  } = useOrderDetailForm(applicationID as string);

  const {
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<OrderDetails>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(schemaValidation),
  });

  React.useEffect(() => {
    reset(queryResult.data);
    // const progress = calculateProgress();
    // setProgress(parseInt(progress));
  }, [queryResult.data]);

  console.log("errors", errors);

  const onChange = async () => {
    const data = getValues();
    try {
      // validate data
      const validated = await schemaValidation.validate(data);
      console.log("validations:", validated);
      handleDebouncedChange(validated);
    } catch (e) {
      console.log(e);
    }
  };
  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/supplierInfo`
    );
  };

  const onSubmit = async () => {
    const data = getValues();
    try {
      await schemaValidation.validate(data);
      // validate products as a whole
      await productSchemaValidation.validate(productsData);

      router.push(
        `/users/${
          router.asPath.split("/")[2]
        }/entities/${entityID}/quick/${applicationID}/paymentTerms`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ApplicationLayout>
      <div className="ptContainer">
        <ProductsForm
          applicationId={applicationID}
          sendProductData={handleChildData}
        />
        <div className="vLine"></div>
        <form onChange={onChange} className="portContainer">
          <div className="maintitle">PORTS</div>
          <div className="inputContainer">
            <span>Port of Export</span>
            <input
              type="text"
              className="inputs"
              placeholder="Search ports..."
              {...register(`exportPort`)}
            />
          </div>
          <div className="inputContainer">
            <span>Port of Import</span>
            <input
              type="text"
              className="inputs"
              placeholder="Search ports..."
              {...register(`importPort`)}
            />
          </div>
          <br />
          <br />
          {Object.keys(errors).length != 0 && (
            <span className="errorMessage">
              Please fill all the required fields to continue
            </span>
          )}
        </form>
      </div>
      <BottomBar onBack={onBack} onSubmit={onSubmit}></BottomBar>
    </ApplicationLayout>
  );
}
// Server Side props to get the query params
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}
export default Index;
