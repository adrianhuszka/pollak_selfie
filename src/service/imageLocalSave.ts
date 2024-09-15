import fs from "fs";

export function saveToLocal(imageBase64: string) {
  const date = new Date().toISOString().replace(/:/g, "-").split(".")[0];
  const image = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || "";
  let buffer = Buffer.from(image[2], "base64");

  fs.writeFile(`./static/images/${date}.jpg`, buffer, "base64", function (err) {
    console.log(err);
  });
}
