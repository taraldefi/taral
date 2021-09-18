import { stringify } from "javascript-stringify";

export function toJSON(data: any): string {
  return stringify(data) ?? "";
}

export function toJSONFormatted(data: any) {
  return JSON.stringify(data, null, 2);
}
