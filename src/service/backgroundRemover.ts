import { ImageSource, removeBackground } from "@imgly/background-removal-node";

export async function removeImageBackground(imgSource: ImageSource) {
  const blob = await removeBackground(imgSource);
  console.log(blob);
  const buffer = Buffer.from(await blob.arrayBuffer());
  const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
  return dataURL;
}
