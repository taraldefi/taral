interface LoginResponse {
  token: string;
}
interface RegisterResponse {
  username: string;
  email: string;
  name: string;
  address: string;
  isTwoFAEnabled: boolean;
  contact: string;
  avatar: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface userProfile {
  username: string;
  email: string;
  name: string;
  address: string;
  contact: string;
  avatar: string;
}
interface IupdateUser {
  username: string;
  email: string;
  name: string;
  address: string;
  contact: string;
  status: string;
  roleId: number;
}
interface IcreateUser {
  status: string;
  roleId: number;
  username: string;
  email: string;
  name: string;
}
interface resetPasswordProps {
  token: string;
  password: string;
  confirmPassword: string;
}

interface changePasswordProps {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
interface TwoFAResponse {
  success: boolean;
  qrCodeUri: string;
}
interface EntityProduct {
  id: string;
  title: string;
  issuanceDate: string;
  maturityDate: string;
  amount: number;
}
interface EntityApplication {
  id: string;
  title: string;
  issuanceDate: string;
}
interface Entity {
  id: string;
  name: string;
  logo: any;
  beneficialOwner: string;
  abbreviation: string;
  nationality: string;
  headquarters: string;
  industryType: string;
  coreBusiness: string;
  incorporationDate: string;
  legalForm: string;
}
interface EntityResponse {
  id: string;
  logo: string;
  name: string;
  beneficialOwner: string;
  abbreviation: string;
  nationality: string;
  headquarters: string;
  industryType: string;
  coreBusiness: string;
  incorporationDate: string;
  legalForm: string;
  products: EntityProduct[];
  applications: EntityApplication[];
}

interface EntityCardResponse {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

//Email template interfaces

interface IemailTemplate {
  title: string;
  slug: string;
  sender: string;
  subject: string;
  body: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IcreateEmailTemplate {
  title: string;
  sender: string;
  subject: string;
  body: string;
  isDefault: true;
}

interface IcreateRole {
  name: string;
  description: string;
  permissions: number[];
}
interface IroleResponse {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
interface IcreatePermission {
  description: string;
  resource: string;
  path: string;
  method: string;
}
interface IpermissionResponse {
  resource: string;
  description: string;
  path: string;
  method: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
interface IfileResponse {
  name: string;
  hash: string;
  id: string;
  signedHash: string;
}

export {
  LoginResponse,
  RegisterResponse,
  TwoFAResponse,
  EntityResponse,
  EntityCardResponse,
  Entity,
  resetPasswordProps,
  changePasswordProps,
  userProfile,
  IupdateUser,
  IcreateUser,
  IemailTemplate,
  IcreateEmailTemplate,
  IcreateRole,
  IroleResponse,
  IcreatePermission,
  IpermissionResponse,
  IfileResponse,
};
