import { ICookieService } from "./cookieUtils.types";

const CookieService: ICookieService = {
  setCookie: function (
    name: string,
    value: string,
    path: string = "/",
    days: number = 30
  ): void {
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${exp.toUTCString()};path=${path}`;
  },

  getCookie: function (name: string): string | null {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    const arr = document.cookie.match(reg);
    if (arr) {
      return arr[2];
    } else {
      return null;
    }
  },

  delCookie: function (name: string, path: string = "/"): void {
    const cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = `${name}=${cval};expires=${new Date(
        0
      ).toUTCString()};path=${path}`;
    }
  },
};

export default CookieService;
