-- CreateEnum
CREATE TYPE "CoasterType" AS ENUM ('STEEL', 'WOOD', 'HYBRID', 'LAUNCH', 'INVERTED', 'FLOORLESS', 'WING');

-- CreateEnum
CREATE TYPE "CoasterStatus" AS ENUM ('OPERATING', 'CLOSED_TEMPORARILY', 'CLOSED_PERMANENTLY', 'UNDER_CONSTRUCTION');

-- CreateTable
CREATE TABLE "Park" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "queueTimesParkId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Park_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coaster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parkId" TEXT NOT NULL,
    "manufacturer" TEXT,
    "type" "CoasterType" NOT NULL,
    "status" "CoasterStatus" NOT NULL DEFAULT 'OPERATING',
    "heightFt" DOUBLE PRECISION,
    "dropFt" DOUBLE PRECISION,
    "speedMph" DOUBLE PRECISION,
    "lengthFt" DOUBLE PRECISION,
    "inversions" INTEGER NOT NULL DEFAULT 0,
    "durationSec" INTEGER,
    "maxGForce" DOUBLE PRECISION,
    "intensityScore" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "queueTimesRideId" INTEGER,
    "openedYear" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coaster_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Park_slug_key" ON "Park"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Coaster_slug_key" ON "Coaster"("slug");

-- AddForeignKey
ALTER TABLE "Coaster" ADD CONSTRAINT "Coaster_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
