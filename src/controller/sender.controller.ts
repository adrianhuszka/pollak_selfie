import express, { Request, Response, Router } from "express";
import { sendEmail } from "../service/sendEmail";
import { saveToLocal } from "../service/imageLocalSave";
import { imageSaveToDB } from "../service/imageDBSave";

const router: Router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { email, image, path, email_subject, email_body } = req.body;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    if (email) sendEmail(email, image, email_subject, email_body);
    // await imageSaveToDB(image);
    await saveToLocal(path, image);

    return res
      .status(200)
      .json({ message: "Email sent and/or saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was an error sending the email" });
  }
});

export { router };
