-- CreateEnum
CREATE TYPE "ParkRegion" AS ENUM ('LA', 'OC', 'SD');

-- AlterTable
ALTER TABLE "Park" ADD COLUMN     "region" "ParkRegion" NOT NULL DEFAULT 'LA';
