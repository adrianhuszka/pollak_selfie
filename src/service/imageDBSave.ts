import { PrismaClient } from '@prisma/client';
import { b64toBlob } from '../utils/base64ToBlobConvertes';

const prisma = new PrismaClient();

export const imageSaveToDB = async (image: string) => {
  const imageBlob = b64toBlob(image);

  console.log('imageBlob: ', imageBlob);
  try {
    const result = await prisma.pictures.create({
      data: {
        image: imageBlob as any,
      },
    });
    return result;
  } catch (error: Error | any) {
    console.error('Error in imageDBSave: ', error);
  }
};