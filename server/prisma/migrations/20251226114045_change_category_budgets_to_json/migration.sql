/*
  Warnings:

  - You are about to drop the `category_budgets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category_budgets" DROP CONSTRAINT "category_budgets_budgetId_fkey";

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "categoryBudgets" JSONB NOT NULL DEFAULT '{}';

-- DropTable
DROP TABLE "category_budgets";
