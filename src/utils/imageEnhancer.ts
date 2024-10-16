const tf = require("@tensorflow/tfjs-node");
const Upscaler = require("upscaler/node");
import fs from "fs";

export async function upscale(imageB64: string, date: string) {
  const upscaler = new Upscaler();
  const byteCharacters = atob(imageB64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const totalLength = byteArrays.reduce(
    (acc, byteArray) => acc + byteArray.length,
    0
  );
  const mergedArray = new Uint8Array(totalLength);
  let offset = 0;
  for (const byteArray of byteArrays) {
    mergedArray.set(byteArray, offset);
    offset += byteArray.length;
  }
  const image = tf.node.decodeImage(mergedArray);

  const tensor = await upscaler.upscale(image);
  const upscaledTensor = await tf.node.encodePng(tensor);
  fs.writeFileSync(`./static/images/${date}.png`, upscaledTensor);
}
