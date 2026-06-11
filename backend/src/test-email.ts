import { transporter } from "./lib/mailer";

async function testSMTP() {
  try {
    await transporter.verify();
    console.log("SMTP Server is ready")
  } catch (error) {
    console.error("Verification Failed:" + error)
  }
} 


testSMTP()