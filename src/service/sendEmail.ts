import nodemailer from "nodemailer";

export function sendEmail(emailAddress: string, image: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: false,
    tls: {
      ciphers: "SSLv3"
    }
  });

  const mailData = {
    from: process.env.EMAIL_FROM,
    to: emailAddress,
    subject: "Test Email",
    html: `<h1>Üdvözlünk a Pollákból!</h1><br/><img title="Hi" alt="hi" src="cid:image" />`,
    attachments: [
      {
        filename: "image.jpg",
        content: image.split("base64,")[1],
        encoding: "base64",
        cid: "image",
      },
    ],
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log(`Response: ${info}`);
    }
  });
}
