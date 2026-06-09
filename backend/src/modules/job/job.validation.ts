import * as z from "zod";

export const sendEmailSchema = z.object({
  to: z.email(),
  subject: z.string().min(1),
  body: z.string().min(1)
})

export const createJobSchema = z.object({
  jobType: z.enum(["SEND_EMAIL"]),
  payload: sendEmailSchema
})

export type CreateJobInput = z.infer<typeof createJobSchema>;
