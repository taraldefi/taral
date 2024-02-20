import { atom } from "jotai";

export const orderUpdateModeAtom = atom<boolean>(false);

export const selectedApplicationForRepaymentAtom = atom<string | null>(null);

//TODO: remove these state variables after setting up exporter side
export const previousPaymentRadioButtonAtom = atom<string | null>(null);
export const interestRadioButtonAtom = atom<string | null>(null);
export const fixedInterestRadioButtonAtom = atom<string | null>(null);
export const degressiveInterestRadioButtonAtom = atom<string | null>(null);
export const applicationProgressAtom = atom<number>(0);
export const collateralRadioButtonAtom = atom<string | null>(null);
export const collateralPaymentExpRadioButtonAtom = atom<string | null>(null);
export const collateralInfluenceRadioButtonAtom = atom<string | null>(null);
export const exporterQuickApplicationAtom = atom({
  exporterInfo: {
    companyName: "",
    phoneNo: "",
    address: "",
    postalCode: "",
    totalRevenue: "",
    revenuePercentage: "",
  },
  importerInfo: {
    companyName: "",
    phoneNo: "",
    address: "",
    postalCode: "",
    totalRevenue: "",
    previousPaymentHistory: {
      description: "",
      lengthOfPaymentExperience: "",
      noOfDeals: "",
      avgVol: "",
      paymentHistory: "",
    },
  },
  contract: false,
  paymentTerms: {
    isConcluded: "",
    isPartial: "",
    interest: {
      currency: "",
      rate: "",
      fixedRate: "",
      degressiveRate: "",
    },
    paymentType: "",
    paymentDuration: "",
  },
  security: {
    facilityType: "",
    financingRatio: "",
    facilityAmount: "",
    tenure: "",
    purpose: "",
    sourceOfRepayment: "",
    collateralInfluence: "",
    collateralPaymentExp: "",
  },
  docs: [],
});
