/*
  Warnings:

  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - Added the required column `client_name` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_name` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endTime",
DROP COLUMN "event",
DROP COLUMN "name",
DROP COLUMN "startTime",
ADD COLUMN     "client_name" TEXT NOT NULL,
ADD COLUMN     "end_time" TEXT,
ADD COLUMN     "event_name" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT;
