-- CreateTable
CREATE TABLE "merchantTransfer" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toMerchantId" INTEGER NOT NULL,

    CONSTRAINT "merchantTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "merchantTransfer" ADD CONSTRAINT "merchantTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantTransfer" ADD CONSTRAINT "merchantTransfer_toMerchantId_fkey" FOREIGN KEY ("toMerchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
