import buyerApplicationService from "@services/application/buyerApplicationService";
import { useMutation, useQuery } from "@tanstack/react-query";
import debounce from "just-debounce-it";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CreateProduct, OrderDetails, Product } from "src/types/order_details";
import * as Yup from "yup";

// initial data for order details
const initialData: OrderDetails = {
  exportPort: "",
  importPort: "",
};

// initial data for products
const productInitialData = {
  products: [],
};

// schema validation for order details
const schemaValidation = Yup.object().shape({
  exportPort: Yup.string().required("Required"),
  importPort: Yup.string().required("Required"),
});

// schema validation for individual product
const singleProductSchemaValidation = Yup.object().shape({
  id: Yup.string().required("id is required"),
  name: Yup.string().required("name is required"),
  quantity: Yup.number().required("quantity is required"),
  unitPrice: Yup.number().required("unit price is required"),
});

// schema validation for products
const productSchemaValidation = Yup.object().shape({
  products: Yup.array().of(singleProductSchemaValidation).min(1),
});

const useOrderDetailForm = (applicationID: string) => {
  const [updateMode, setUpdateMode] = useState(false);

  // initial fetch function similar to buyer information
  const getProductsInitialData = async () => {
    try {
      // Attempt to fetch product info from the backend, using order API
      const response = await buyerApplicationService.getOrderDetailInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      const responseData = {
        products: response.products,
      };

      // If successful, use the fetched data for the form
      return responseData;
    } catch (error) {
      return productInitialData; // or return some default data if needed
    }
  };

  const getInitialData = async () => {
    console.log("applicationID", applicationID);

    try {
      // Attempt to fetch order info from the backend
      const response = await buyerApplicationService.getOrderDetailInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      const responseData: OrderDetails = {
        importPort: response.importPort,
        exportPort: response.exportPort,
      };

      // If successful, use the fetched data for the form
      return responseData;
    } catch (error) {
      return initialData; // or return some default data if needed
    }
  };

  /* product does not have a create mode because product creation 
  is handled inside the product component
   */
  const saveProductToDatabase = async (args: Product) => {
    const payload: CreateProduct = {
      name: args.name,
      quantity: args.quantity,
      unitPrice: args.unitPrice,
    };

    const updateProductInfo = buyerApplicationService.updateProductInfo(
      applicationID as string,
      args.id,
      payload
    );

    toast.promise(updateProductInfo, {
      loading: "Loading...",
      success: (data) => {
        return `product ${data.name} updated`;
      },
      error: (err) => {
        return `${err}`;
      },
    });
  };

  // function to auto save order information data to backend
  const saveChangeToDatabase = async (args: OrderDetails) => {
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
          return `order created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    } else {
      const updateOrderInfo = buyerApplicationService.updateOrderInfo(
        applicationID as string,
        args
      );

      toast.promise(updateOrderInfo, {
        loading: "Loading...",
        success: (data) => {
          return `order information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };
  const queryResult = useQuery({
    queryKey: ["orderInfo"],
    queryFn: getInitialData,
  });

  const productQueryResult = useQuery({
    queryKey: ["productInfo"],
    queryFn: getProductsInitialData,
  });
  const { mutateAsync } = useMutation({
    mutationFn: saveChangeToDatabase,
  });

  const { mutateAsync: productMutateAsync } = useMutation({
    mutationFn: saveProductToDatabase,
  });

  const handleDebouncedChange = useMemo(
    () =>
      debounce((data: OrderDetails) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );

  const handleDebouncedProductChange = useMemo(
    () =>
      debounce((data: Product) => {
        console.log(data);
        productMutateAsync(data);
      }, 500),
    [productMutateAsync]
  );

  return {
    schemaValidation,
    productSchemaValidation,
    queryResult,
    handleDebouncedChange,
    handleDebouncedProductChange,
    productQueryResult,
    singleProductSchemaValidation,
  };
};

export default useOrderDetailForm;
