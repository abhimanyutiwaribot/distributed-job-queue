# Distributed Job Queue

A production-inspired distributed job queue built using Bun, Express, PostgreSQL and Prisma.

The system supports concurrent workers, retries, dead letter queues (DLQ), idempotency, stuck job recovery and multi-worker processing using PostgreSQL row-level locking.

## Features

* PostgreSQL-backed queue
* Concurrent worker processing
* Retry mechanism with exponential delay
* Dead Letter Queue (DLQ)
* DLQ requeue support
* API idempotency
* Job execution idempotency
* Stuck job recovery
* Metrics endpoint
* Multiple job handlers
* Simple Rate limiting to POST/ endpoints

## Architecture

### High Level Architecture

<img src="https://raw.githubusercontent.com/abhimanyutiwaribot/distributed-job-queue/refs/heads/master/architecture/backend/architecture.png"/>

### Job Lifecycle / Retry Logic

<img src="https://raw.githubusercontent.com/abhimanyutiwaribot/distributed-job-queue/refs/heads/master/architecture/backend/job-lifecycle.png" />

### Worker Claiming Strategy

<img src="https://raw.githubusercontent.com/abhimanyutiwaribot/distributed-job-queue/refs/heads/master/architecture/backend/worker-claim-job.png" />

### Recovery Flow

<img src="https://raw.githubusercontent.com/abhimanyutiwaribot/distributed-job-queue/refs/heads/master/architecture/backend/stuck-recovery.png" />

### Requeue of Failed Job

<img src="https://raw.githubusercontent.com/abhimanyutiwaribot/distributed-job-queue/refs/heads/master/architecture/backend/requeue.png" />

## Tech Stack

### Backend

* Bun
* Express
* TypeScript
* PostgreSQL
* Prisma ORM
* Zod

### Infrastructure

* Railway
* Gmail SMTP (Demo Handler) using nodemailer

## Database Design

<!-- [Insert Database Schema Diagram] -->

Tables:

* Job
* IdempotencyKey
* DeadLetterJob

## API Endpoints

### Jobs

| Method | Endpoint  |
| ------ | --------- |
| POST   | /jobs     |
| GET    | /jobs     |
| GET    | /jobs/:id |

### Dead Letter Queue

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /dlq             |
| POST   | /dlq/:id/requeue |

<!-- ### Metrics

| Method | Endpoint |
| ------ | -------- |
| GET    | /metrics | -->

## Engineering Challenges

### Concurrent Worker Processing

Multiple workers may attempt to claim the same job simultaneously. To solve this, workers use PostgreSQL row-level locking: FOR UPDATE SKIP LOCKED

This guarantees that only one worker can claim a job at a time.

### Retry Mechanism

Failed jobs are automatically retried up to the configured retry limit before being moved to the Dead Letter Queue.

### Dead Letter Queue

Jobs that exceed the retry limit are moved into a dedicated DeadLetterJob table for inspection and manual reprocessing.

### Idempotency

The system prevents duplicate job creation and duplicate job execution through idempotency keys.

### Stuck Job Recovery

If a worker crashes after claiming a job, the recovery process detects stale locks and moves abandoned jobs back into the queue.

## Running Locally

### Install Dependencies

```bash
bun install
```

### Environment Variables

```env
DATABASE_URL=
PORT=8080
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### Run API

```bash
bun run dev
or
bun run src/index.ts
```

### Run Worker

```bash
bun run src/worker/worker.ts
```

## Future Improvements

* Scheduled Jobs
* Priority Queues
* Advanced Metrics
* Queue Dashboard
* Prometheus Integration
* Multiple Worker Pools
* Additional Job Types