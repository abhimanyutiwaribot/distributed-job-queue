export async function sendEmailHandler(payload: unknown){
  console.log("Sending Email");
  console.log(payload);

  throw new Error("SMTP DOWN")
}