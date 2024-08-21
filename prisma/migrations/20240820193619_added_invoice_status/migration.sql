/*
  Warnings:

  - You are about to drop the column `paid` on the `invoices` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'UNPAID', 'PENDING', 'SCHOLARSHIP');

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "paid",
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'UNPAID';
