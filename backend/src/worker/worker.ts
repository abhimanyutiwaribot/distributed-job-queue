import { claimJob } from "./worker.claimJob";
import { executeJob } from "./worker.executeJob";

while(true){
  const job = await claimJob();

  // if here crash happened what happens ????
  
  if(!job){
    await Bun.sleep(5000);
    continue;
  }

  await executeJob(job)
}