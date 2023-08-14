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
  ENTITY: string;
  CREATE_FILE: string;
  UPDATE_FILE: string;
  REQUEST_FILE: string;
}

const config: Config = {
  USER_LOGIN: `${process.env.BASE_URL}/auth/login`,
  USER_REGISTER: `${process.env.BASE_URL}/auth/register`,
  USER_ACTIVATE: `${process.env.BASE_URL}/auth/activate-account`,
  USER_PROFILE: `${process.env.BASE_URL}/auth/profile`,
  USER_CHANGE_PASSWORD: `${process.env.BASE_URL}/auth/change-password`,
  USER_RESET_PASSWORD: `${process.env.BASE_URL}/auth/reset-password`,
  USER_FORGOT_PASSWORD: `${process.env.BASE_URL}/auth/forgot-password`,
  REFRESH_TOKEN: `${process.env.BASE_URL}/auth/refresh`,
  USER_LOGOUT: `${process.env.BASE_URL}/auth/logout`,
  USER_AUTHENTICATE: `${process.env.BASE_URL}/twofa/authenticate`,
  USER_TOGGLE_2FA: `${process.env.BASE_URL}/twofa`,
  USER: `${process.env.BASE_URL}/users`,
  ENTITY: `${process.env.BASE_URL}/v1/entities`,
  EMAIL_TEMPLATE: `${process.env.BASE_URL}/v1/email-templates`,
  ROLES: `${process.env.BASE_URL}/v1/roles`,
  PERMISSIONS: `${process.env.BASE_URL}/v1/permissions`,
  CREATE_FILE: `${process.env.BASE_URL}/v1/files/create-file`,
  UPDATE_FILE: `${process.env.BASE_URL}/v1/files/update-file`,
  REQUEST_FILE: `${process.env.BASE_URL}/v1/files/request-file`,
};

const localConfig: Config = {
  USER_LOGIN: `${process.env.BASE_URL}/auth/login`,
  USER_REGISTER: `${process.env.BASE_URL}/auth/register`,
  USER_ACTIVATE: `${process.env.BASE_URL}/auth/activate-account`,
  USER_PROFILE: `${process.env.BASE_URL}/auth/profile`,
  USER_CHANGE_PASSWORD: `${process.env.BASE_URL}/auth/change-password`,
  USER_RESET_PASSWORD: `${process.env.BASE_URL}/auth/reset-password`,
  USER_FORGOT_PASSWORD: `${process.env.BASE_URL}/auth/forgot-password`,
  REFRESH_TOKEN: `${process.env.BASE_URL}/auth/refresh`,
  USER_LOGOUT: `${process.env.BASE_URL}/auth/logout`,
  USER_AUTHENTICATE: `${process.env.BASE_URL}/twofa/authenticate`,
  USER_TOGGLE_2FA: `${process.env.BASE_URL}/twofa`,
  USER: `${process.env.BASE_URL}/users`,
  ENTITY: `${process.env.BASE_URL}/v1/entities`,
  EMAIL_TEMPLATE: `${process.env.BASE_URL}/v1/email-templates`,
  ROLES: `${process.env.BASE_URL}/v1/roles`,
  PERMISSIONS: `${process.env.BASE_URL}/v1/permissions`,
  CREATE_FILE: `${process.env.BASE_URL}/v1/files/create-file`,
  UPDATE_FILE: `${process.env.BASE_URL}/v1/files/update-file`,
  REQUEST_FILE: `${process.env.BASE_URL}/v1/files/request-file`,
};

const urls = process.env.NODE_ENV === "production" ? config : localConfig;

export default urls;
