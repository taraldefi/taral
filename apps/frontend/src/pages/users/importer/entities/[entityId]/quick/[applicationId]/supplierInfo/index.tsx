import ApplicationLayout from "@components/layouts/new_application_layout";
import BottomBar from "@components/newApplicationBottom";
import { CreateSupplierInformationForBuyerApplication } from "src/types/supplier_info_for_buyer";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import buyerApplicationService from "@services/application/buyerApplicationService";
import { toast } from "sonner";
import convertDate from "@utils/lib/convertDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import debounce from "just-debounce-it";

// const schemaValidation = Yup.object({
//   supplierInformation: Yup.object({
//     company: Yup.object({
//       companyName: Yup.string().required("Company name is required"),

//       dateEstablished: Yup.string().required("Establishment date is required"),

//       phoneNumber: Yup.string().required("Phone number is required"),

//       registrationNumbers: Yup.string().required(
//         "Registration numbers are required"
//       ),

//       address: Yup.object({
//         city: Yup.string().required("City is required"),

//         addressLine1: Yup.string().required("Address line 1 is required"),

//         addressLine2: Yup.string().required("Address line 2 is required"),

//         postalCode: Yup.string().required("Postal code is required"),
//       }),
//     }),
//   }),
//   relationshipWithSupplier: Yup.object({
//     shareHoldingRelationship: Yup.string().nullable(),
//     influence: Yup.string().nullable(),
//     paymentExperience: Yup.object({
//       description: Yup.string().nullable(),
//       length: Yup.string().nullable(),
//       noOfDeals: Yup.string().nullable(),
//       avgBusinessVol: Yup.string().nullable(),
//       history: Yup.string().nullable(),
//       delays: Yup.string().nullable(),
//     }),
//   }),
// });

function Index({ ...props }) {
  const { query } = props;
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState("No");
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelectedRadioBtn(e.currentTarget.value);
  const [updateMode, setUpdateMode] = React.useState(false);

  const router = useRouter();
  const entityID = query.entityId;
  const applicationID = query.applicationId;

  const getInitialData = async () => {
    console.log("applicationID", applicationID);
    const initialData: CreateSupplierInformationForBuyerApplication = {
      supplierInformation: {
        company: {
          companyName: "",
          dateEstablished: "",
          phoneNumber: "",
          registrationNumbers: "",
          address: {
            city: "",
            addressLine1: "",
            addressLine2: "",
            postalCode: "",
          },
        },
      },
      relationshipWithSupplier: {
        shareHoldingRelationship: null,
        influence: null,
        paymentExperience: {
          description: null,
          length: null,
          noOfDeals: null,
          avgBusinessVol: null,
          history: null,
          delays: null,
        },
      },
    };

    try {
      // Attempt to fetch buyer info from the backend
      const response = await buyerApplicationService.getSupplierInfo(
        applicationID as string
      );
      if (response && response.id) {
        setUpdateMode(true);
      }
      const responseData: CreateSupplierInformationForBuyerApplication = {
        supplierInformation: {
          company: {
            companyName: response.supplier.companyName,
            dateEstablished: response.supplier.dateEstablished,
            phoneNumber: response.supplier.phoneNumber,
            registrationNumbers: response.supplier.registrationNumbers,
            address: {
              city: response.supplier.address.city,
              addressLine1: response.supplier.address.addressLine1,
              addressLine2: response.supplier.address.addressLine2,
              postalCode: response.supplier.address.postalCode,
            },
          },
        },
        relationshipWithSupplier: {
          shareHoldingRelationship:
            response.relationshipWithSupplier.shareHoldingRelationship ?? null,
          influence: response.relationshipWithSupplier.influence ?? null,
          paymentExperience: {
            description:
              response.relationshipWithSupplier.paymentExperience.description ??
              null,
            length:
              response.relationshipWithSupplier.paymentExperience.length ??
              null,
            noOfDeals:
              response.relationshipWithSupplier.paymentExperience.noOfDeals ??
              null,
            avgBusinessVol:
              response.relationshipWithSupplier.paymentExperience
                .avgBusinessVol ?? null,
            history:
              response.relationshipWithSupplier.paymentExperience.history ??
              null,
            delays:
              response.relationshipWithSupplier.paymentExperience.delays ??
              null,
          },
        },
      };

      // If successful, use the fetched data for the form
      return responseData;
    } catch (error) {
      return initialData; // or return some default data if needed
    }
  };

  const saveChangeToDatabase = async (
    args: CreateSupplierInformationForBuyerApplication
  ) => {
    console.count("payload for patch:" + JSON.stringify(args));
    if (!updateMode) {
      const createSupplierInfo = buyerApplicationService.createSupplierInfo(
        applicationID as string,
        args
      );
      toast.promise(createSupplierInfo, {
        loading: "Loading...",
        success: (data) => {
          setUpdateMode(true);
          return `supplier information created`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
      const response = await createSupplierInfo;
      const responseData: CreateSupplierInformationForBuyerApplication = {
        supplierInformation: {
          company: {
            companyName: response.supplier.companyName,
            dateEstablished: convertDate(response.supplier.dateEstablished),
            phoneNumber: response.supplier.phoneNumber,
            registrationNumbers: response.supplier.registrationNumbers,
            address: {
              city: response.supplier.address.city,
              addressLine1: response.supplier.address.addressLine1,
              addressLine2: response.supplier.address.addressLine2,
              postalCode: response.supplier.address.postalCode,
            },
          },
        },
        relationshipWithSupplier: {
          shareHoldingRelationship:
            response.relationshipWithSupplier.shareHoldingRelationship ?? null,
          influence: response.relationshipWithSupplier.influence ?? null,
          paymentExperience: {
            description:
              response.relationshipWithSupplier.paymentExperience.description ??
              null,
            length:
              response.relationshipWithSupplier.paymentExperience.length ??
              null,
            noOfDeals:
              response.relationshipWithSupplier.paymentExperience.noOfDeals ??
              null,
            avgBusinessVol:
              response.relationshipWithSupplier.paymentExperience
                .avgBusinessVol ?? null,
            history:
              response.relationshipWithSupplier.paymentExperience.history ??
              null,
            delays:
              response.relationshipWithSupplier.paymentExperience.delays ??
              null,
          },
        },
      };
      return responseData;
    } else {
      const updateSupplierInfo = buyerApplicationService.updateSupplierInfo(
        applicationID as string,
        args
      );

      toast.promise(updateSupplierInfo, {
        loading: "Loading...",
        success: (data) => {
          return `supplier information updated`;
        },
        error: (err) => {
          return `${err}`;
        },
      });
      const response = await updateSupplierInfo;
      console.log("response:", response);
      const responseData: CreateSupplierInformationForBuyerApplication = {
        supplierInformation: {
          company: {
            companyName: response.supplier.companyName,
            dateEstablished: convertDate(response.supplier.dateEstablished),
            phoneNumber: response.supplier.phoneNumber,
            registrationNumbers: response.supplier.registrationNumbers,
            address: {
              city: response.supplier.address.city,
              addressLine1: response.supplier.address.addressLine1,
              addressLine2: response.supplier.address.addressLine2,
              postalCode: response.supplier.address.postalCode,
            },
          },
        },
        relationshipWithSupplier: {
          shareHoldingRelationship:
            response.relationshipWithSupplier.shareHoldingRelationship ?? null,
          influence: response.relationshipWithSupplier.influence ?? null,
          paymentExperience: {
            description:
              response.relationshipWithSupplier.paymentExperience.description ??
              null,
            length:
              response.relationshipWithSupplier.paymentExperience.length ??
              null,
            noOfDeals:
              response.relationshipWithSupplier.paymentExperience.noOfDeals ??
              null,
            avgBusinessVol:
              response.relationshipWithSupplier.paymentExperience
                .avgBusinessVol ?? null,
            history:
              response.relationshipWithSupplier.paymentExperience.history ??
              null,
            delays:
              response.relationshipWithSupplier.paymentExperience.delays ??
              null,
          },
        },
      };

      return responseData;
    }
  };

  const { register, handleSubmit, formState, reset, getValues } =
    useForm<CreateSupplierInformationForBuyerApplication>({
      mode: "all",
      criteriaMode: "all",
    });

  const queryResult = useQuery(["supplierInfo"], getInitialData);
  const mutationResult = useMutation(saveChangeToDatabase, {
    onSuccess: (dataTosave: CreateSupplierInformationForBuyerApplication) => {
      console.count("success mutating: " + JSON.stringify(dataTosave));
    },
  });

  const { errors } = formState;
  const { mutateAsync } = mutationResult;

  const handleDebouncedChange = React.useMemo(
    () =>
      debounce((data: CreateSupplierInformationForBuyerApplication) => {
        console.log(data);
        mutateAsync(data);
      }, 500),
    [mutateAsync]
  );
  const onChange = async () => {
    const data = getValues();
    data.relationshipWithSupplier.shareHoldingRelationship = null;
    data.relationshipWithSupplier.influence = null;
    data.relationshipWithSupplier.paymentExperience.delays = null;
    console.log(data);
    try {
      // const validated = await schemaValidation.validate(data);
      // console.log("valdiations:", validated);
      if (Object.keys(errors).length === 0) {
        handleDebouncedChange(data);
      } else {
        console.log("errors:", errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    reset(queryResult.data);
    // const progress = calculateProgress();
    // setProgress(parseInt(progress));
  }, [queryResult.data]);

  const onSubmit = (data: any) => {
    console.log("data:", data);
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/orderDetails`
    );
  };

  const onBack = () => {
    router.push(
      `/users/${
        router.asPath.split("/")[2]
      }/entities/${entityID}/quick/${applicationID}/importerInfo`
    );
  };
  return (
    <div>
      <ApplicationLayout>
        <form onChange={onChange} className="exporterInfoContainer">
          <div className="generalInfo">
            <div className="maintitle">GENERAL INFO</div>
            <div className="form-item">
              <span>Supplier&apos;s company name</span>
              <input
                type="text"
                className="inputs"
                placeholder="Company name..."
                {...register("supplierInformation.company.companyName", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Phone Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
                {...register("supplierInformation.company.phoneNumber", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Date</span>
              <input
                type="date"
                className="inputs"
                placeholder="Contact number..."
                {...register("supplierInformation.company.dateEstablished", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Registration Number</span>
              <input
                type="text"
                className="inputs"
                placeholder="Contact number..."
                {...register(
                  "supplierInformation.company.registrationNumbers",
                  {
                    required: true,
                  }
                )}
              />
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 1..."
                {...register(
                  "supplierInformation.company.address.addressLine1",
                  {
                    required: true,
                  }
                )}
              />
            </div>
            <div>
              <span>Address Line 2</span>
              <input
                type="text"
                className="inputs"
                placeholder="Address line 2..."
                {...register(
                  "supplierInformation.company.address.addressLine2",
                  {
                    required: true,
                  }
                )}
              />
            </div>
            <div>
              <span>City</span>
              <input
                type="text"
                className="inputs"
                placeholder="city"
                {...register("supplierInformation.company.address.city", {
                  required: true,
                })}
              />
            </div>
            <div>
              <span>Company Post Code</span>
              <input
                type="text"
                className="inputs"
                placeholder="Post code..."
                {...register("supplierInformation.company.address.postalCode", {
                  required: true,
                })}
              />
            </div>
            <div></div>
          </div>
          <div className="vLine"></div>
          <div className="taxAndRevenue">
            <div className="maintitle">RELATIONSHIP WITH SUPPLIER</div>

            <div className="radioBack">
              <span>
                Do you have previous payment experience with the Supplier?
              </span>
              <div>
                <div>
                  <input
                    type="radio"
                    id="Audited"
                    name="financials"
                    value="Yes"
                    checked={selectedRadioBtn == "Yes"}
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="Audited">YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="In-house"
                    name="financials"
                    value="No"
                    checked={selectedRadioBtn == "No"}
                    onChange={handleRadioClick}
                  />
                  <label htmlFor="In-house">NO</label>
                </div>
              </div>
            </div>
            {selectedRadioBtn == "Yes" && (
              <>
                <div>
                  <span>Describe your previous payment experience.</span>
                  <input
                    className="inputs"
                    id="greyed"
                    placeholder="Desciption..."
                    {...register(
                      "relationshipWithSupplier.paymentExperience.description",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  />
                </div>
                <div>
                  <span>Length of payment experience</span>
                  <input
                    className="inputs"
                    id="greyed"
                    placeholder="Payment length..."
                    {...register(
                      "relationshipWithSupplier.paymentExperience.length",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  />
                </div>
                <div>
                  <span>Number of deals</span>
                  <input
                    className="inputs"
                    id="greyed"
                    placeholder="Number of deals..."
                    {...register(
                      "relationshipWithSupplier.paymentExperience.noOfDeals",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  />
                </div>
                <div>
                  <span>Average volume of business with your customer</span>
                  <input
                    className="inputs"
                    id="greyed"
                    placeholder="Business volume..."
                    {...register(
                      "relationshipWithSupplier.paymentExperience.avgBusinessVol",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  />
                </div>
                <div>
                  <span>Payment history with Supplier</span>
                  <select
                    className="inputs"
                    id="greyed"
                    {...register(
                      "relationshipWithSupplier.paymentExperience.history",
                      { required: selectedRadioBtn == "Yes" }
                    )}
                  >
                    <option value="">Select type...</option>
                    <option value="ON_TIME">On time</option>
                    <option value="DELAYS">Delays</option>
                  </select>
                </div>
              </>
            )}
            {Object.keys(errors).length != 0 && (
              <span className="errorMessage">
                Please fill all the required fields to continue
              </span>
            )}
          </div>

          <div className="otherInfo"></div>
        </form>
        <BottomBar
          onSubmit={handleSubmit(onSubmit)}
          onBack={onBack}
        ></BottomBar>
      </ApplicationLayout>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}

export default Index;
