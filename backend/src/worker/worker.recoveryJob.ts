import { prisma } from "../database/db";

export async function recoveryStuckJobs(){
  const recovered = await prisma.job.updateMany({
    where: {
      status: 'PROCESSING',
      lockedAt: {
        lt: new Date(
          Date.now() - 5 * 60 * 1000    // job older than 5 minutes and it is still PROCESSING 
        )
      }
    },
    data: {
      status: 'PENDING',
      lockedAt: null
    }
  })

  console.log(
    `Recovered ${recovered.count} jobs`
  );
} 

setInterval(async() => {
  await recoveryStuckJobs()
}, 30000);     // every 30 seconds we will check