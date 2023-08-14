import Hooks from "./utilsHooks";
import cookieService from "./lib/cookieUtils";
import { ICookieService } from "./lib/cookieUtils.types";
import authHeader from "./lib/authHeader";

interface ICoreUtils extends Hooks {
  getCookie: ICookieService["getCookie"];
  setCookie: ICookieService["setCookie"];
  delCookie: ICookieService["delCookie"];
  authHeader: typeof authHeader;
}

const CoreUtils = new Hooks() as ICoreUtils;

CoreUtils.add("getCookie", (name: string) => cookieService.getCookie(name));
CoreUtils.add(
  "setCookie",
  (name: string, value: string, path: string = "/", days: number = 30) =>
    cookieService.setCookie(name, value, path, days)
);
CoreUtils.add("delCookie", (name: string, path: string = "/") =>
  cookieService.delCookie(name, path)
);
CoreUtils.add("authHeader", () => authHeader());

export default CoreUtils;
