interface Config {
  // authentication and user routes
  USER_LOGIN: string;
  USER_REGISTER: string;
  USER_ACTIVATE: string;
  USER_PROFILE: string;
  USER_CHANGE_PASSWORD: string;
  USER_RESET_PASSWORD: string;
  USER_FORGOT_PASSWORD: string;
  REFRESH_TOKEN: string;
  USER_LOGOUT: string;
  USER_AUTHENTICATE: string;
  USER_TOGGLE_2FA: string;
  USER: string;
  EMAIL_TEMPLATE: string;
  ROLES: string;
  PERMISSIONS: string;

  // entity routes
  ENTITY: string;
  SUPPLIER_ENTITY: string;
  ENTITYLOGO: string;

  // file routes
  CREATE_FILE: string;
  UPDATE_FILE: string;
  REQUEST_FILE: string;

  // mark tx docs
  TRANSACTION_DOCUMENTS: string;

  // application routes
  APPLICATION: string;
}

const config: Config = {
  USER_LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
  USER_REGISTER: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
  USER_ACTIVATE: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/activate-account`,
  USER_PROFILE: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/profile`,
  USER_CHANGE_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`,
  USER_RESET_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
  USER_FORGOT_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
  REFRESH_TOKEN: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
  USER_LOGOUT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
  USER_AUTHENTICATE: `${process.env.NEXT_PUBLIC_BASE_URL}/twofa/authenticate`,
  USER_TOGGLE_2FA: `${process.env.NEXT_PUBLIC_BASE_URL}/twofa`,
  USER: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
  ENTITY: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/entities`,
  SUPPLIER_ENTITY: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/supplier-entities`,
  ENTITYLOGO: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/logo`,
  EMAIL_TEMPLATE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/email-templates`,
  ROLES: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/roles`,
  PERMISSIONS: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/permissions`,
  CREATE_FILE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/create-file`,
  UPDATE_FILE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/update-file`,
  REQUEST_FILE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/request-file`,
  TRANSACTION_DOCUMENTS: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/transaction-docs`,
  APPLICATION: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/quick-applications`,
};

const localConfig: Config = {
  USER_LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
  USER_REGISTER: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
  USER_ACTIVATE: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/activate-account`,
  USER_PROFILE: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/profile`,
  USER_CHANGE_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`,
  USER_RESET_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
  USER_FORGOT_PASSWORD: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
  REFRESH_TOKEN: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
  USER_LOGOUT: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
  USER_AUTHENTICATE: `${process.env.NEXT_PUBLIC_BASE_URL}/twofa/authenticate`,
  USER_TOGGLE_2FA: `${process.env.NEXT_PUBLIC_BASE_URL}/twofa`,
  USER: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
  ENTITY: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/entities`,
  SUPPLIER_ENTITY: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/supplier-entities`,
  ENTITYLOGO: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/logo`,
  EMAIL_TEMPLATE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/email-templates`,
  ROLES: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/roles`,
  PERMISSIONS: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/permissions`,
  CREATE_FILE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/create-file`,
  UPDATE_FILE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/update-file`,
  REQUEST_FILE: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/files/request-file`,
  TRANSACTION_DOCUMENTS: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/transaction-docs`,
  APPLICATION: `${process.env.NEXT_PUBLIC_BASE_URL}/v1/quick-applications`,
};

const urls = process.env.NODE_ENV === "production" ? config : localConfig;

export default urls;
