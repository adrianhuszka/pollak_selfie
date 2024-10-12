import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const imageSaveToDB = async (image: string) => {
  console.log("inSaveDb");
  const imageBlob = Buffer.from(image, "base64");

  try {
    const result = await prisma.pictures.create({
      data: {
        image: imageBlob,
      },
    });
    return result;
  } catch (error: Error | any) {
    console.error("Error in imageDBSave: ", error);
  }
};
