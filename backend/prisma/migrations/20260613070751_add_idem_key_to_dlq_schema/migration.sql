/*
  Warnings:

  - Added the required column `idemKey` to the `DeadLetterJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeadLetterJob" ADD COLUMN     "idemKey" TEXT NOT NULL;
