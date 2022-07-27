import path from "path";
import fs from "fs"
import FormData from "form-data";
import fetch from "node-fetch";

export async function storageManualTest() {
    //     const deployerPrivateKey =
    //     "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601";
    //   const publicKey = publicKeyFromPrivKey(deployerPrivateKey);
    //   const stacksPrivateKey: StacksPrivateKey = createStacksPrivateKey(deployerPrivateKey);

    console.log('lalala');

    const filePath = path.join(__dirname, "../testfiles/dummy.pdf");
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    const fileStream = fs.createReadStream(filePath);

    const form = new FormData();

    form.append('field-name', fileStream, { filename: "dummy.pdf", knownLength: fileSizeInBytes });
    form.append("signedMessage", "Hello world");
    form.append("signature", "5bd25b481e3bce3d8c70c7e8165c32a2ded778f7ef5de3af38f13062ead0410e64ac1ba7459be3a491e3d4ecc971a63b6a994d470899f35cbcab60851759475800");

    const requestOptions = {
        method: "POST",
        body: form
    };

    await fetch(`http://localhost:3000/api/v1/files/create-file`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));

    console.log(path.join(__dirname, "../testfiles/dummy.pdf"))
}

