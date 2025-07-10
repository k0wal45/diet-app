/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Diet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DietMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Meal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MealProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "createdBy" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "clientId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Diet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DietMeal" DROP CONSTRAINT "DietMeal_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "dietId" SET DATA TYPE BIGINT,
ALTER COLUMN "mealId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "DietMeal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "Meal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MealProduct" DROP CONSTRAINT "MealProduct_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "mealId" SET DATA TYPE BIGINT,
ALTER COLUMN "productId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "MealProduct_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealProduct" ADD CONSTRAINT "MealProduct_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealProduct" ADD CONSTRAINT "MealProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietMeal" ADD CONSTRAINT "DietMeal_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietMeal" ADD CONSTRAINT "DietMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
