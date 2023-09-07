import entityService from "@services/entityService";

export function getBase64Src(imageBuffer: any): string {
  const base64ImageString = Buffer.from(imageBuffer, "binary").toString(
    "base64"
  );
  const srcValue = "data:image/png;base64," + base64ImageString;
  return srcValue;
}

export default async function fetchEntityLogo(id: string): Promise<string> {
  let srcImg = "";
  try {
    const res = await entityService.getEntityLogo(id);
    srcImg = getBase64Src(res);
  } catch (error) {
    console.error("Error fetching entity:", error);
  }
  return srcImg;
}
