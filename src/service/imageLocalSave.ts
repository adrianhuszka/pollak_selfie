import fs from "fs";
import { removeImageBackground } from "../utils/backgroundRemover";

export async function saveToLocal(path: string, imageBase64: string) {
  const date = new Date().toISOString().replace(/:/g, "-").split(".")[0];
  const image = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || "";
  const buffer = Buffer.from(image[2], "base64");

  if (path) {
    fs.writeFile(
      `./static/images/${path}/${date}.jpg`,
      buffer,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  } else {
    fs.writeFile(
      `./static/images/${date}.jpg`,
      buffer,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  }

  console.log("Image saved to local");
}
