import path from "path";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";
import { createStacksPrivateKey, signMessageHashRsv, StacksPrivateKey } from "lib-stacks";

export async function storageManualTest() {
  const message = "Hello";
  const deployerPrivateKey = "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";
  const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(deployerPrivateKey);
  
  const signature = signMessageHashRsv({
    message: message,
    privateKey: stacksPrivateKey,
  });

  const filePath = path.join(__dirname, "../testfiles/dummy.pdf");
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileStream = fs.createReadStream(filePath);

  const form = new FormData();

  form.append("file", fileStream, {
    filename: "dummy.pdf",
    knownLength: fileSizeInBytes,
  });

  form.append("signedMessage", message);
  
  form.append(
    "signature",
    signature.data
  );

  const requestOptions = {
    method: "POST",
    body: form,
  };

  await fetch(`http://localhost:3000/api/v1/files/create-file`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  console.log(path.join(__dirname, "../testfiles/dummy.pdf"));
}
