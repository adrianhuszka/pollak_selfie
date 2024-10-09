import express, { Request, Response, Router } from "express";
import { sendEmail } from "../service/sendEmail";
import { saveToLocal } from "../service/imageLocalSave";
import { imageSaveToDB } from "../service/imageDBSave";

const router: Router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { email, image } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email addresses are required" });
  }

  if (!image) {
    return res.status(400).json({ message: "Images are required" });
  }

  try {
    sendEmail(email, image);
    // await imageSaveToDB(image);
    await saveToLocal(image);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error sending the email" });
  }
});

export { router };
