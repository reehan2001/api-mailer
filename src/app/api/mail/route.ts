import { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer'; 


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    return new Response(`Get method is not allowed for this end point`);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.body)
    const { email, subject, message } = await req.json();
    console.log(email,subject,message);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "a.reehanroshan91@gmail.com",
        pass: "obnu lmzt zhfq mdrw",
      },
    });

    const mailConfigs = {
      from: "a.reehanroshan91@gmail.com", 
      to: email,
      subject: `Application for ${subject} Position`,
      html: `
      <p>Dear ${message},</p>
      <p>Thank you for your interest in  Skcript. We appreciate the time and effort you put into submitting your application.</p>
      <p>We are impressed with your qualifications and experience, and we would like to invite you to interview with us. Your application has successfully passed our initial screening process, and we believe that you have the potential to make valuable contributions to our team.</p>
      <p>Best Regards</p>
      `,
    };

    await transporter.sendMail(mailConfigs);

    return new Response(`Sucessfullu send the mail`);
  } catch (error) {
    console.error(error);
    return new Response(`error has occured`);
  }
}