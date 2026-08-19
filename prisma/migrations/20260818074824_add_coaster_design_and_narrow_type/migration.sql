/*
  Warnings:

  - The values [LAUNCH,INVERTED,FLOORLESS,WING] on the enum `CoasterType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "CoasterDesign" AS ENUM ('SIT_DOWN', 'INVERTED', 'FLYING', 'WING', 'SUSPENDED', 'STAND_UP', 'FLOORLESS', 'FOURTH_DIMENSION', 'SINGLE_RAIL', 'BOBSLED', 'MINE_TRAIN', 'WATER_COASTER', 'DIVE', 'MOTORBIKE');

-- AlterEnum
BEGIN;
CREATE TYPE "CoasterType_new" AS ENUM ('STEEL', 'WOOD', 'HYBRID');
ALTER TABLE "Coaster" ALTER COLUMN "type" TYPE "CoasterType_new" USING ("type"::text::"CoasterType_new");
ALTER TYPE "CoasterType" RENAME TO "CoasterType_old";
ALTER TYPE "CoasterType_new" RENAME TO "CoasterType";
DROP TYPE "public"."CoasterType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Coaster" ADD COLUMN     "design" "CoasterDesign" NOT NULL DEFAULT 'SIT_DOWN';
