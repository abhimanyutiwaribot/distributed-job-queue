import { claimJob } from "./worker.claimJob";
import { executeJob } from "./worker.executeJob";

while(true){
  const job = await claimJob();

  
  if(!job){
    await Bun.sleep(5000);
    continue;
  }

  // process.exit(1);    // if here worker crashed, what happens ????
  
  await executeJob(job)
}