import { prisma } from "../../database/db";

export async function getJobMetrics() {
  const [
    totalJobs,
    pendingJobs,
    processingJobs,
    completedJobs,
    failedJobs,
    dlqJobs
  ] = await Promise.all([
    prisma.job.count(),
    prisma.job.count({ where: { status: "PENDING" } }),
    prisma.job.count({ where: { status: "PROCESSING" } }),
    prisma.job.count({ where: { status: "COMPLETED" } }),
    prisma.job.count({ where: { status: "FAILED" } }),
    prisma.deadLetterJob.count()
  ]);

  const successRate = totalJobs > 0 ? ((completedJobs / totalJobs) * 100).toFixed(2) : 0;
  const failureRate = totalJobs > 0 ? ((failedJobs / totalJobs) * 100).toFixed(2) : 0;

  return {
    jobs: {
      total: totalJobs,
      pending: pendingJobs,
      processing: processingJobs,
      completed: completedJobs,
      failed: failedJobs
    },
    deadLetterQueue: {
      total: dlqJobs
    },
    rates: {
      successRate: parseFloat(successRate as string),
      failureRate: parseFloat(failureRate as string)
    }
  };
}

export async function getJobTypeMetrics() {
  const metrics = await prisma.job.groupBy({
    by: ["job_type"],
    _count: {
      id: true
    },
    _max: {
      updatedAt: true
    }
  });

  return metrics.map((m) => ({
    jobType: m.job_type,
    count: m._count.id,
    lastUpdated: m._max.updatedAt
  }));
}

export async function getAverageAttempts() {
  const result = await prisma.job.aggregate({
    _avg: {
      attempts: true
    },
    _max: {
      attempts: true
    },
    _min: {
      attempts: true
    }
  });

  return {
    average: result._avg.attempts || 0,
    max: result._max.attempts || 0,
    min: result._min.attempts || 0
  };
}

export async function getIdempotencyMetrics() {
  const [
    totalKeys,
    pendingKeys,
    processingKeys,
    completedKeys,
    failedKeys
  ] = await Promise.all([
    prisma.idempotencyKey.count(),
    prisma.idempotencyKey.count({ where: { status: "PENDING" } }),
    prisma.idempotencyKey.count({ where: { status: "PROCESSING" } }),
    prisma.idempotencyKey.count({ where: { status: "COMPLETED" } }),
    prisma.idempotencyKey.count({ where: { status: "FAILED" } })
  ]);

  return {
    total: totalKeys,
    pending: pendingKeys,
    processing: processingKeys,
    completed: completedKeys,
    failed: failedKeys
  };
}

export async function getDLQMetrics() {
  const [totalDLQ, dlqByJobType] = await Promise.all([
    prisma.deadLetterJob.count(),
    prisma.deadLetterJob.groupBy({
      by: ["jobType"],
      _count: {
        id: true
      }
    })
  ]);

  return {
    total: totalDLQ,
    byJobType: dlqByJobType.map((d) => ({
      jobType: d.jobType,
      count: d._count.id
    }))
  };
}

export async function getAllMetrics() {
  const [jobMetrics, jobTypeMetrics, attemptMetrics, idempotencyMetrics, dlqMetrics] = await Promise.all([
    getJobMetrics(),
    getJobTypeMetrics(),
    getAverageAttempts(),
    getIdempotencyMetrics(),
    getDLQMetrics()
  ]);

  return {
    jobs: jobMetrics,
    jobTypes: jobTypeMetrics,
    attempts: attemptMetrics,
    idempotency: idempotencyMetrics,
    dlq: dlqMetrics,
    timestamp: new Date()
  };
}
