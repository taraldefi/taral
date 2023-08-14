import React from "react";

export interface EntityDataType {
  id: number;
  image: string;
  title: string;
  registrationNo: number;
  products: number;
  applications: number;
}
export interface EntityType {
  entityData: EntityDataType;
  modal?: React.ReactNode;
}
export interface EntityViewType {
  infoData: InfoDataType[];
}

export interface InfoDataType {
  BeneficialOwner: string;
  CodeAbbreviation: string;
  Nationality: string;
  HeadquartersLocation: string;
  IndustryType: string;
  CoreBusiness: string;
  IncorporationDate: string;
  LegalForm: string;
}
