/*
  Warnings:

  - A unique constraint covering the columns `[merchantId]` on the table `MerchantBalance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MerchantBalance_merchantId_key" ON "MerchantBalance"("merchantId");
