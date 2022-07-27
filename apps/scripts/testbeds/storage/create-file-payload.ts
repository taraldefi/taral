import path from "path";
import fs from "fs";
import FormData from "form-data";
import { sign } from "./signature-payload";

export function createFormPayload() {
  const signature = sign();
  const filePath = path.join(__dirname, "../testfiles/dummy.pdf");
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileStream = fs.createReadStream(filePath);

  const form = new FormData();

  form.append("file", fileStream, {
    filename: "dummy.pdf",
    knownLength: fileSizeInBytes,
  });

  form.append("signedMessage", signature.message);

  form.append("signature", signature.data);

  const requestOptions = {
    method: "POST",
    body: form,
  };

  return requestOptions;
}
