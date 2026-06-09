import { claimJob } from "./claim-job";
import { executeJob } from "./execute-job";

while(true){
  const job = await claimJob();

  if(!job){
    await Bun.sleep(5000);
    continue;
  }

  await executeJob(job)
}