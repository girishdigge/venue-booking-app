/*
  Warnings:

  - The values [MainHall] on the enum `Hall` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Hall_new" AS ENUM ('mainHall', 'secondHall');
ALTER TABLE "Event" ALTER COLUMN "hall" TYPE "Hall_new" USING ("hall"::text::"Hall_new");
ALTER TYPE "Hall" RENAME TO "Hall_old";
ALTER TYPE "Hall_new" RENAME TO "Hall";
DROP TYPE "Hall_old";
COMMIT;

-- DropIndex
DROP INDEX "Session_userId_key";
