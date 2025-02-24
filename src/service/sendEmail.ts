import nodemailer from "nodemailer";

export function sendEmail(
  emailAddress: string,
  image: string,
  emailSubject: string,
  emailBody: string
): void {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    secure: false,
    tls: {
      ciphers: "SSLv3",
    },
  });

  const mailData = {
    from: process.env.EMAIL_FROM,
    to: emailAddress,
    subject: emailSubject ?? process.env.EMAIL_SUBJECT,
    html: `${
      emailBody ?? process.env.EMAIL_BODY
    }<br/><img title="Üdvözlünk a Pollákból!" alt="Üdvözlünk a Pollákból!" src="cid:image" />`,
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
      console.log(`Response: ${info.response}`);
    }
  });
}
