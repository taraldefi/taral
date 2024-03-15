import React from 'react';

export interface EntityDataType {
	id: string;
	name: string;
	abbreviation: string;
	registrationNumber?: number;
	products?: number;
	applications?: number;
	logo: string;
}
export interface EntityType {
	entityData: EntityDataType;
	modal?: React.ReactNode;
	fetchLogo?: (id: string) => Promise<string>;
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
