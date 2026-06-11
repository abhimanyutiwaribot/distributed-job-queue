/*
  Warnings:

  - Added the required column `status` to the `IdempotencyKey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IdempotencyKey" ADD COLUMN     "status" "IdempotencyStatus" NOT NULL;
