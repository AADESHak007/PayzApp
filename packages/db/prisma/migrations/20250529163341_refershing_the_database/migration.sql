/*
  Warnings:

  - Added the required column `password` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AuthType" ADD VALUE 'Credentials';

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "password" TEXT NOT NULL;
