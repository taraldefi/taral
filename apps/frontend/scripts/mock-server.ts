import express from "express";
import next from "next";
import cors from "cors";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cors());

    server.post("/upload", (req, res) => {
      setTimeout(() => {
        console.log("file uploaded");
        return res.status(200).json({ result: true, msg: "file uploaded" });
      }, 3000);
    });

    server.delete("/upload", (req, res) => {
      console.log(`File deleted`);
      return res.status(200).json({ result: true, msg: "file deleted" });
    });

    server.listen(8080, () => {
      console.log(`Server running on port 8080`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
