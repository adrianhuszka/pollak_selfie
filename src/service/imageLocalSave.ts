import fs from "fs";
import { removeImageBackground } from "./backgroundRemover";

export async function saveToLocal(imageBase64: string) {
  const date = new Date().toISOString().replace(/:/g, "-").split(".")[0];
  const image = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || "";
  const buffer = Buffer.from(image[2], "base64");

  fs.writeFile(`./static/images/${date}.jpg`, buffer, "base64", function (err) {
    console.log(err);
  });

  console.log("Image saved to local");

  const removedBgBase64 = await removeImageBackground(
    `./static/images/${date}.jpg`
  );

  const imageRemovedBg =
    removedBgBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || "";
  const bufferRemovedBg = Buffer.from(imageRemovedBg[2], "base64");

  fs.writeFile(
    `./static/images/${date}-removed.jpg`,
    bufferRemovedBg,
    "base64",
    function (err) {
      console.log(err);
    }
  );

  console.log("Background removed");
}
