 import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTempletes.js";
   

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "omarsalah3mmory@gmail.com",
    pass: "clio vcyv lwup hkoj", //from google app password, must enable 2-way verification
  },
  tls:{
     rejectUnauthorized:false
  }
});

// Wrap in an async IIFE so we can use await.
export const sendMail = async (email) => {

  const info = await transporter.sendMail({
    from: '"NTIG13" <omarsalah3mmory@gmail.com>',

    to: email,

    subject: "Hello ✔",
    text: "Hello world?", 
    html: emailTemplate(email), 
  });

  console.log("Message sent:", info.messageId);
}
