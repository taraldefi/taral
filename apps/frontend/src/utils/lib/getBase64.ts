export function getBase64Src(imageBuffer: any): string {
  const base64ImageString = Buffer.from(imageBuffer, "binary").toString(
    "base64"
  );
  const srcValue = "data:image/png;base64," + base64ImageString;
  return srcValue;
}
