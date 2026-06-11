/*
  Warnings:

  - Made the column `idem_key` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "idem_key" SET NOT NULL;
