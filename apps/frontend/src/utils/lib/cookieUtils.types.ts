export interface ICookieService {
  setCookie: (
    name: string,
    value: string,
    path?: string,
    days?: number
  ) => void;
  getCookie: (name: string) => string | null;
  delCookie: (name: string, path?: string) => void;
}
