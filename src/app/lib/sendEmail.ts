import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = (obj: any) => {
  const { userName, token } = obj.payload;
  switch (obj.type) {
    // Signup
    case "signup":
      return {
        subject: "Welcome to SmartInvoice",
        text:
          `Hello ${userName},\n\n` +
          `Thank you for signing up with SmartInvoice. Please click the link below to verify your email address.\n\n` +
          `${process.env.BASE_URL}/confirmsignup?token=${token}\n\n` +
          `Best regards,\n` +
          `SmartInvoice`,
      };
    // Invite
    case "invite":
      return {
        subject: "Invitation to SmartInvoice",
        text:
          `Hello ${userName},\n\n` +
          `You have been invited to join SmartInvoice. Please click the link below to verify your email address.\n\n` +
          `${process.env.BASE_URL}/confirminvite?token=${token}\n\n` +
          `Best regards,\n` +
          `SmartInvoice`,
      };
  }
};

export async function sendEmail(obj: any) {
  const mail: any = mailOptions(obj);
  const info = await transporter.sendMail({
    from: '"SmartInvoice" <noreply@smartinvoice.com>',
    to: obj.payload.userEmail,
    subject: mail.subject,
    text: mail.text,
  });
  console.log(info);
}
