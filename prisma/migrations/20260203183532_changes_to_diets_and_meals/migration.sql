/*
  Warnings:

  - You are about to drop the column `carbs` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `kcal` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `kcal` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Meal` table. All the data in the column will be lost.
  - Made the column `clientId` on table `Diet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_clientId_fkey";

-- DropForeignKey
ALTER TABLE "DietMeal" DROP CONSTRAINT "DietMeal_dietId_fkey";

-- DropForeignKey
ALTER TABLE "DietMeal" DROP CONSTRAINT "DietMeal_mealId_fkey";

-- DropForeignKey
ALTER TABLE "MealProduct" DROP CONSTRAINT "MealProduct_mealId_fkey";

-- DropForeignKey
ALTER TABLE "MealProduct" DROP CONSTRAINT "MealProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "kcal",
DROP COLUMN "protein",
ALTER COLUMN "clientId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "kcal",
DROP COLUMN "protein";

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealProduct" ADD CONSTRAINT "MealProduct_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealProduct" ADD CONSTRAINT "MealProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietMeal" ADD CONSTRAINT "DietMeal_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietMeal" ADD CONSTRAINT "DietMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
