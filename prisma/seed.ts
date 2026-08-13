// prisma/seed.ts

// Purpose: populates your empty database with real, curated starter data
// for a handful of well-known SoCal coasters. Run this once after
// tables are created, and re-run any time to reset to this baseline

import { PrismaClient, CoasterType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Six Flags Magic Mountain
  const magicMountain = await prisma.park.upsert({
    where: { slug: 'six-flags-magic-mountain' },
    update: {},
    create: {
      name: 'Six Flags Magic Mountain',
      slug: 'six-flags-magic-mountain',
      lat: 34.4233,
      lng: -118.5965,
      address: '26101 Magic Mountain Pkwy, Valencia, CA 91355',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'x2' },
    update: {},
    create: {
      name: 'X2',
      slug: 'x2',
      parkId: magicMountain.id,
      manufacturer: 'Arrow Dynamics / S&S',
      type: CoasterType.STEEL,
      heightFt: 200,
      dropFt: 215,
      speedMph: 76,
      inversions: 0,
      durationSec: 150,
      intensityScore: 10,
      lat: 34.4241,
      lng: -118.5978,
      openedYear: 2002,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'twisted-colossus' },
    update: {},
    create: {
      name: 'Twisted Colossus',
      slug: 'twisted-colossus',
      parkId: magicMountain.id,
      manufacturer: 'Rocky Mountain Construction',
      type: CoasterType.HYBRID,
      heightFt: 121,
      dropFt: 116,
      speedMph: 62,
      inversions: 2,
      durationSec: 180,
      intensityScore: 8,
      lat: 34.4225,
      lng: -118.5955,
      openedYear: 2015,
    },
  });

  // Knott's Berry Farm 
  const knotts = await prisma.park.upsert({
    where: { slug: 'knotts-berry-farm' },
    update: {},
    create: {
      name: "Knott's Berry Farm",
      slug: 'knotts-berry-farm',
      lat: 33.8455,
      lng: -117.9959,
      address: '8039 Beach Blvd, Buena Park, CA 90620',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'ghostrider' },
    update: {},
    create: {
      name: 'GhostRider',
      slug: 'ghostrider',
      parkId: knotts.id,
      manufacturer: 'Custom Coasters International / RMC',
      type: CoasterType.WOOD,
      heightFt: 118,
      dropFt: 108,
      speedMph: 56,
      inversions: 0,
      durationSec: 150,
      intensityScore: 7,
      lat: 33.8459,
      lng: -117.9975,
      openedYear: 1998,
    },
  });

  // Disneyland
  const disneyland = await prisma.park.upsert({
    where: { slug: 'disneyland' },
    update: {},
    create: {
      name: 'Disneyland Park',
      slug: 'disneyland',
      lat: 33.8121,
      lng: -117.919,
      address: '1313 Disneyland Dr, Anaheim, CA 92802',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'space-mountain' },
    update: {},
    create: {
      name: 'Space Mountain',
      slug: 'space-mountain',
      parkId: disneyland.id,
      manufacturer: 'WED Enterprises',
      type: CoasterType.STEEL,
      heightFt: 118,
      speedMph: 32,
      inversions: 0,
      durationSec: 180,
      intensityScore: 5,
      lat: 33.8135,
      lng: -117.9227,
      openedYear: 1977,
    },
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });