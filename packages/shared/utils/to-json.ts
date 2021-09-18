import { stringify } from "javascript-stringify";

export function toJSON(data: any): string {

    // if (typeof data === "bigint") {
    //     return data.toString();
    // }

    // return JSON.stringify(data);

    return stringify(data) ?? '';

    // return JSON.stringify(data, (key, value) => {
    //     typeof value === "bigint" ? value.toString() + "n" : value
    // }).toString();
}

export function toJSONFormatted(data: any) {
    return JSON.stringify(data, null, 2);
}