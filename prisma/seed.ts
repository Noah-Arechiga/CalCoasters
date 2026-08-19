// prisma/seed.ts

// Purpose: Populates empty database with real, curated data
// for a handful of well-known SoCal coasters. Run this once after
// tables are created, and re-run any time to reset to this baseline

import { PrismaClient, CoasterType, CoasterDesign } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Disneyland
  const disneyland = await prisma.park.upsert({
    where: { slug: 'disneyland' },
    update: { queueTimesParkId: 16, region: 'OC' },
    create: {
      name: 'Disneyland',
      slug: 'disneyland',
      lat: 33.8125,
      lng: -117.9190,
      address: '1313 Disneyland Dr, Anaheim, CA 92802',
      queueTimesParkId: 16,
      region: 'OC',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'big-thunder-mountain-railroad' },
    update: { queueTimesRideId: 323, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Big Thunder Mountain Railroad', // Big Thunder Mountain Railroad
      slug: 'big-thunder-mountain-railroad',
      parkId: disneyland.id,
      manufacturer: 'Dynamic Attractions',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 104,
      speedMph: 28,
      inversions: 0,
      durationSec: 201,
      imageUrl: '/images/coasters/big_thunder_mountain_railroad.jpg',
      intensityScore: 4,
      lat: 33.8130,
      lng: -117.9204,
      openedYear: 1979,
      queueTimesRideId: 323,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'chip-n-dale-gadget-coaster' }, // Chip 'n' Dale's GADGETcoaster
    update: { queueTimesRideId: 324, design: CoasterDesign.SIT_DOWN },
    create: {
      name: `Chip 'n' Dale's GADGETcoaster`,
      slug: 'chip-n-dale-gadget-coaster',
      parkId: disneyland.id,
      manufacturer: 'Vekoma',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 27.9,
      speedMph: 21.7,
      inversions: 0,
      durationSec: 44,
      imageUrl: '/images/coasters/chip_and_dale_gadgetcoaster.jpg',
      intensityScore: 1,
      lat: 33.8152,
      lng: -117.9192,
      openedYear: 1993,
      queueTimesRideId: 324,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'matterhorn-bobsleds' }, // Matterhorn Bobsleds
    update: { queueTimesRideId: 279, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Matterhorn Bobsleds',
      slug: 'matterhorn-bobsleds',
      parkId: disneyland.id,
      manufacturer: 'Arrow Dynamics',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 80,
      speedMph: 27,
      inversions: 0,
      durationSec: 127,
      imageUrl: '/images/coasters/matterhorn_bobsleds.jpg',
      intensityScore: 5,
      lat: 33.8132,
      lng: -117.9179,
      openedYear: 1959,
      queueTimesRideId: 279,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'space-mountain' },    // Space Mountain
    update: { queueTimesRideId: 284, design: CoasterDesign.SIT_DOWN, },
    create: {
      name: 'Space Mountain',
      slug: 'space-mountain',
      parkId: disneyland.id,
      manufacturer: 'Dynamic Attractions',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 100,
      speedMph: 32,
      inversions: 0,
      durationSec: 165,
      imageUrl: '/images/coasters/space_mountain.jpg',
      intensityScore: 4,
      lat: 33.8111,
      lng: -117.9174,
      openedYear: 1977,
      queueTimesRideId: 284,
    },
  });

  // Disney California Adventure
  const dca = await prisma.park.upsert({
    where: { slug: 'disney-california-adventure' },
    update: { queueTimesParkId: 17, region: 'OC' },
    create: {
      name: 'Disney California Adventure',
      slug: 'disney-california-adventure',
      lat: 33.8061,
      lng: -117.9201,
      address: '1313 Disneyland Dr, Anaheim, CA 92802',
      queueTimesParkId: 17,
      region: 'OC',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'goofy-sky-school' },    // Goofy's Sky School
    update: { queueTimesRideId: 319, design: CoasterDesign.SIT_DOWN },
    create: {
      name: `Goofy's Sky School`,
      slug: 'goofy-sky-school',
      parkId: dca.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 55,
      speedMph: 27,
      inversions: 0,
      durationSec: 105,
      imageUrl: '/images/coasters/goofys_sky_school.jpg',
      intensityScore: 3,
      lat: 33.8064,
      lng:  -117.9229,
      openedYear: 2001,
      queueTimesRideId: 319,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'incredicoaster' },    // Incredicoaster
    update: { queueTimesRideId: 322, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Incredicoaster',
      slug: 'incredicoaster',
      parkId: dca.id,
      manufacturer: 'Intamin Amusement Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 122,
      dropFt: 108,
      speedMph: 55,
      inversions: 1,
      durationSec: 156,
      imageUrl: '/images/coasters/incredicoaster.jpg',
      intensityScore: 6,
      lat: 33.8046,
      lng: -117.9204,
      openedYear: 2001,
      queueTimesRideId: 322,
    },
  });

  // Knott's Berry Farm 
  const knotts = await prisma.park.upsert({
    where: { slug: 'knotts-berry-farm' },
    update: { queueTimesParkId: 61, region: 'OC' },
    create: {
      name: "Knott's Berry Farm",
      slug: 'knotts-berry-farm',
      lat: 33.8443,
      lng: -118.0004,
      address: '8039 Beach Blvd, Buena Park, CA 90620',
      queueTimesParkId: 61,
      region: 'OC',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'coast-rider' },      // Coast Rider
    update: { queueTimesRideId: 5929, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Coast Rider',
      slug: 'coast-rider',
      parkId: knotts.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 52,
      dropFt: 52,
      speedMph: 37,
      inversions: 0,
      durationSec: 150,
      imageUrl: '/images/coasters/coast_rider.jpg',
      intensityScore: 4,
      lat: 33.8450,
      lng: -118.0019,
      openedYear: 2013,
      queueTimesRideId: 5929,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'ghostrider' },      // GhostRider
    update: { queueTimesRideId: 5912, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'GhostRider',
      slug: 'ghostrider',
      parkId: knotts.id,
      manufacturer: 'Custom Coasters International',
      type: CoasterType.WOOD,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 118,
      dropFt: 108,
      speedMph: 56,
      inversions: 0,
      durationSec: 160,
      imageUrl: '/images/coasters/ghostrider.jpg',
      intensityScore: 7,
      lat: 33.8430,
      lng: -117.9992,
      openedYear: 1998,
      queueTimesRideId: 5912,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'hangtime' },        // HangTime
    update: { queueTimesRideId: 5911, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'HangTime',
      slug: 'hangtime',
      parkId: knotts.id,
      manufacturer: 'Gerstlauer Amusement Rides GmbH',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 150,
      dropFt: 150,
      speedMph: 57,
      inversions: 5,
      durationSec: 150,
      imageUrl: '/images/coasters/hang_time.jpg',
      intensityScore: 8,
      lat: 33.8444,
      lng: -118.0014,
      openedYear: 2018,
      queueTimesRideId: 5911,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'jaguar' },        // Jaguar!
    update: { queueTimesRideId: 5922, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Jaguar!',
      slug: 'jaguar',
      parkId: knotts.id,
      manufacturer: 'Zierer',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 65,
      dropFt: 45,
      speedMph: 35,
      inversions: 0,
      durationSec: 120,
      imageUrl: '/images/coasters/jaguar.jpg',
      intensityScore: 3,
      lat: 33.8458,
      lng: -117.9992,
      openedYear: 1995,
      queueTimesRideId: 5922,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'montezooma-the-forbidden-fortress' }, // MonteZOOMa: The Forbidden Fortress
    update: { queueTimesRideId: 13824, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'MonteZOOMa: The Forbidden Fortress',
      slug: 'montezooma-the-forbidden-fortress',
      parkId: knotts.id,
      manufacturer: 'Schwarzkopf',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 148,
      speedMph: 55,
      inversions: 1,
      durationSec: 36,
      imageUrl: '/images/coasters/montezooma_the_forbidden_fortress.jpg',
      intensityScore: 5,
      lat: 33.8456,
      lng: -117.9990,
      openedYear: 2026,
      queueTimesRideId: 13824,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'pony-express' },        // Pony Express
    update: { queueTimesRideId: 5930, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Pony Express',
      slug: 'pony-express',
      parkId: knotts.id,
      manufacturer: 'Zamperla',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 44.3,
      speedMph: 38,
      inversions: 0,
      durationSec: 36,
      imageUrl: '/images/coasters/pony_express.jpg',
      intensityScore: 4,
      lat: 33.8430,
      lng: -118.0013,
      openedYear: 2008,
      queueTimesRideId: 5930,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'sierra-sidewinder' }, // Sierra Sidewinder
    update: { queueTimesRideId: 5919, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Sierra Sidewinder',
      slug: 'sierra-sidewinder',
      parkId: knotts.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 64,
      dropFt: 41,
      speedMph: 36.9,
      inversions: 0,
      durationSec: 116,
      imageUrl: '/images/coasters/sierra_sidewinder.jpg',
      intensityScore: 4,
      lat: 33.8430,
      lng: -118.0013,
      openedYear: 2007,
      queueTimesRideId: 5919,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'silver-bullet' },       // Silver Bullet
    update: { queueTimesRideId: 5923, design: CoasterDesign.INVERTED },
    create: {
      name: 'Silver Bullet',
      slug: 'silver-bullet',
      parkId: knotts.id,
      manufacturer: 'Bolliger & Mabillard',
      type: CoasterType.STEEL,
      design: CoasterDesign.INVERTED,
      heightFt: 146,
      dropFt: 109,
      speedMph: 55,
      inversions: 6,
      durationSec: 150,
      imageUrl: '/images/coasters/silver_bullet.jpg',
      intensityScore: 7,
      lat: 33.8444,
      lng: -117.9997,
      openedYear: 2004,
      queueTimesRideId: 5923,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'snoopys-tenderpaw-twister-coaster' }, // Snoopy’s Tenderpaw Twister Coaster
    update: { queueTimesRideId: 13743, design: CoasterDesign.SIT_DOWN },
    create: {
      name: `Snoopy’s Tenderpaw Twister Coaster`,
      slug: 'snoopys-tenderpaw-twister-coaster',
      parkId: knotts.id,
      manufacturer: 'Zamperla',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 14.5,
      speedMph: 16,
      inversions: 0,
      durationSec: 60,
      imageUrl: '/images/coasters/snoopys_tenderpaw_twister_coaster.jpg',
      intensityScore: 1,
      lat: 33.8462,
      lng: -117.9983,
      openedYear: 2024,
      queueTimesRideId: 13743,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'xcelerator' },            // Xcelerator
    update: { queueTimesRideId: 5918, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Xcelerator',
      slug: 'xcelerator',
      parkId: knotts.id,
      manufacturer: 'Intamin Amusement Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 205,
      dropFt: 205,
      speedMph: 82,
      inversions: 0,
      durationSec: 62,
      imageUrl: '/images/coasters/xcelerator.jpg',
      intensityScore: 10,
      lat: 33.8458,
      lng: -118.0018,
      openedYear: 2002,
      queueTimesRideId: 5918,
    },
  });

  // LEGOLAND California
  const legoland = await prisma.park.upsert({
    where: { slug: 'legoland-california' },
    update: { queueTimesParkId: 279, region: 'SD' },
    create: {
      name: 'LEGOLAND California',
      slug: 'legoland-california',
      lat: 33.1262,
      lng: -117.3106,
      address: 'One LEGOLAND Dr, Carlsbad, CA 92008',
      queueTimesParkId: 279,
      region: 'SD',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'coastersaurus' },       // Coastersaurus
    update: { queueTimesRideId: 6903, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Coastersaurus',
      slug: 'coastersaurus',
      parkId: legoland.id,
      manufacturer: 'Gerstlauer Amusement Rides GmbH',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 18.1,
      speedMph: 20.5,
      inversions: 0,
      durationSec: 60,
      imageUrl: '/images/coasters/coastersaurus.jpg',
      intensityScore: 1,
      lat: 33.1264,
      lng: -117.3123,
      openedYear: 2004,
      queueTimesRideId: 6903,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'dragon-coaster' },      // Dragon Coaster
    update: { queueTimesRideId: 6923, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Dragon Coaster',
      slug: 'dragon-coaster',
      parkId: legoland.id,
      manufacturer: 'Vekoma',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 43,
      speedMph: 28,
      inversions: 0,
      durationSec: 180,
      imageUrl: '/images/coasters/dragon_coaster.jpg',
      intensityScore: 2,
      lat: 33.1289,
      lng: -117.3099,
      openedYear: 1999,
      queueTimesRideId: 6923,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'galacticoaster' },    // Galacticoaster
    update: { queueTimesRideId: 16238, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Galacticoaster',
      slug: 'galacticoaster',
      parkId: legoland.id,
      manufacturer: 'ART Engineering GmbH',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 30,
      speedMph: 40,
      inversions: 0,
      durationSec: 50,
      imageUrl: '/images/coasters/galacticoaster.jpg',
      intensityScore: 4,
      lat: 33.1274,
      lng: -117.3134,
      openedYear: 2026,
      queueTimesRideId: 16238,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'technic-coaster' },   // Technic Coaster
    update: { queueTimesRideId: 6914, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Technic Coaster',
      slug: 'technic-coaster',
      parkId: legoland.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 51.8,
      dropFt: 49.8,
      speedMph: 35,
      inversions: 0,
      durationSec: 95,
      imageUrl: '/images/coasters/technic_coaster.jpg',
      intensityScore: 4,
      lat: 33.1276,
      lng: -117.3094,
      openedYear: 2001,
      queueTimesRideId: 6914,
    },
  });

  // SeaWorld San Diego
  const seaworld = await prisma.park.upsert({
    where: { slug: 'sea-world-san-diego' },
    update: { queueTimesParkId: 20, region: 'SD' },
    create: {
      name: 'SeaWorld San Diego',
      slug: 'sea-world-san-diego',
      lat: 32.7657,
      lng: -117.2264,
      address: '500 SeaWorld Dr, San Diego, CA 92109',
      queueTimesParkId: 20,
      region: 'SD',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'arctic-rescue' },      // Arctic Rescue
    update: { queueTimesRideId: 11977, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Arctic Rescue',
      slug: 'arctic-rescue',
      parkId: seaworld.id,
      manufacturer: 'Intamin Amusement Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 30,
      speedMph: 40,
      inversions: 0,
      durationSec: 75,
      imageUrl: '/images/coasters/arctic_rescue.jpg',
      intensityScore: 4,
      lat: 32.7651,
      lng: -117.2224,
      openedYear: 2023,
      queueTimesRideId: 11977,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'electric-eel' },        // Electric Eel
    update: { queueTimesRideId: 9101, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Electric Eel',
      slug: 'electric-eel',
      parkId: seaworld.id,
      manufacturer: 'Premier Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 150,
      speedMph: 62,
      inversions: 1,
      durationSec: 45,
      imageUrl: '/images/coasters/electric_eel.jpg',
      intensityScore: 7,
      lat: 32.7648,
      lng: -117.2244,
      openedYear: 2018,
      queueTimesRideId: 9101,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'emperor' },               // Emperor
    update: { queueTimesRideId: 10771, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Emperor',
      slug: 'emperor',
      parkId: seaworld.id,
      manufacturer: 'Bolliger & Mabillard',
      type: CoasterType.STEEL,
      heightFt: 153,
      dropFt: 143,
      speedMph: 60,
      inversions: 3,
      durationSec: 95,
      imageUrl: '/images/coasters/emperor.jpg',
      intensityScore: 8,
      lat: 32.7640,
      lng: -117.2224,
      openedYear: 2022,
      queueTimesRideId: 10771,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'journey-to-atlantis' }, // Journey to Atlantis
    update: { queueTimesRideId: 1425, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Journey to Atlantis',
      slug: 'journey-to-atlantis',
      parkId: seaworld.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 95,
      dropFt: 60,
      speedMph: 42,
      inversions: 0,
      durationSec: 300,
      imageUrl: '/images/coasters/journey_to_atlantis.jpg',
      intensityScore: 4,
      lat: 32.7639,
      lng: -117.2233,
      openedYear: 2004,
      queueTimesRideId: 1425,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'manta' },               // Manta
    update: { queueTimesRideId: 1434, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Manta',
      slug: 'manta',
      parkId: seaworld.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 30,
      dropFt: 54,
      speedMph: 43,
      inversions: 0,
      durationSec: 120,
      imageUrl: '/images/coasters/manta.jpg',
      intensityScore: 5,
      lat: 32.7671,
      lng: -117.2280,
      openedYear: 2012,
      queueTimesRideId: 1434,
    },
  });

  // Six Flags Magic Mountain
  const magicMountain = await prisma.park.upsert({
    where: { slug: 'six-flags-magic-mountain' },
    update: { queueTimesParkId: 32, region: 'LA' },
    create: {
      name: 'Six Flags Magic Mountain',
      slug: 'six-flags-magic-mountain',
      lat: 34.4249,
      lng: -118.5960,
      address: '26101 Magic Mountain Pkwy, Valencia, CA 91355',
      queueTimesParkId: 32,
      region: 'LA',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'apocalypse-the-ride' }, // Apocalypse: The Ride
    update: { queueTimesRideId: 2849, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Apocalypse: The Ride',
      slug: 'apocalypse-the-ride',
      parkId: magicMountain.id,
      manufacturer: 'Great Coasters International',
      type: CoasterType.WOOD,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 95,
      dropFt: 87.3,
      speedMph: 50.1,
      inversions: 0,
      durationSec: 180,
      imageUrl: '/images/coasters/apocalypse_the_ride.jpg',
      intensityScore: 6,
      lat: 34.4217,
      lng: -118.6001,
      openedYear: 2009,
      queueTimesRideId: 2849,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'batman-the-ride' },  // BATMAN™: The Ride
    update: { queueTimesRideId: 2850, design: CoasterDesign.INVERTED },
    create: {
      name: 'BATMAN™: The Ride',
      slug: 'batman-the-ride',
      parkId: magicMountain.id,
      manufacturer: 'Bolliger & Mabillard',
      type: CoasterType.STEEL,
      design: CoasterDesign.INVERTED,
      heightFt: 105,
      speedMph: 50,
      inversions: 5,
      durationSec: 120,
      imageUrl: '/images/coasters/batman_the_ride.jpg',
      intensityScore: 6,
      lat: 34.4259,
      lng: -118.6007,
      openedYear: 1994,
      queueTimesRideId: 2850,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'canyon-cruiser' },  // Canyon Cruiser
    update: { queueTimesRideId: 2851, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Canyon Cruiser',
      slug: 'canyon-cruiser',
      parkId: magicMountain.id,
      manufacturer: 'E&F Miler Industries',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 16,
      speedMph: 16,
      inversions: 0,
      durationSec: 45,
      intensityScore: 1,
      lat: 34.4255,
      lng: -118.5960,
      openedYear: 1999,
      queueTimesRideId: 2851,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'full-throttle' },   // Full Throttle
    update: { queueTimesRideId: 2883, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Full Throttle',
      slug: 'full-throttle',
      parkId: magicMountain.id,
      manufacturer: 'Premier Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 164,
      speedMph: 70,
      inversions: 2,
      durationSec: 90,
      imageUrl: '/images/coasters/full_throttle.jpg',
      intensityScore: 7,
      lat: 34.4242,
      lng: -118.5967,
      openedYear: 2013,
      queueTimesRideId: 2883,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'gold-rusher' },       // Gold Rusher
    update: { queueTimesRideId: 2855, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Gold Rusher',
      slug: 'gold-rusher',
      parkId: magicMountain.id,
      manufacturer: 'Arrow Dynamics',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 70,
      speedMph: 35,
      inversions: 0,
      durationSec: 150,
      imageUrl: '/images/coasters/gold_rusher.jpg',
      intensityScore: 4,
      lat: 34.4235,
      lng: -118.5988,
      openedYear: 1971,
      queueTimesRideId: 2855,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'goliath' },           // Goliath
    update: { queueTimesRideId: 2856, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Goliath',
      slug: 'goliath',
      parkId: magicMountain.id,
      manufacturer: 'Giovanola',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 235,
      dropFt: 255,
      speedMph: 85,
      inversions: 0,
      durationSec: 180,
      imageUrl: '/images/coasters/goliath.jpg',
      intensityScore: 7,
      lat: 34.4269,
      lng: -118.5969,
      openedYear: 2000,
      queueTimesRideId: 2856,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'great-american-revolution' }, // Great American Revolution
    update: { queueTimesRideId: 15525, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'The Great American Revolution',
      slug: 'great-american-revolution',
      parkId: magicMountain.id,
      manufacturer: 'Schwarzkopf',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 113,
      speedMph: 55,
      inversions: 1,
      durationSec: 132,
      imageUrl: '/images/coasters/great_american_revolution.jpg',
      intensityScore: 5,
      lat: 34.4216,
      lng: -118.5962,
      openedYear: 1976,
      queueTimesRideId: 15525,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'ninja' },             // Ninja
    update: { queueTimesRideId: 2861, design: CoasterDesign.SUSPENDED },
    create: {
      name: 'Ninja',
      slug: 'ninja',
      parkId: magicMountain.id,
      manufacturer: 'Arrow Dynamics',
      type: CoasterType.STEEL,
      design: CoasterDesign.SUSPENDED,
      heightFt: 60,
      speedMph: 55,
      inversions: 0,
      durationSec: 90,
      imageUrl: '/images/coasters/ninja.jpg',
      intensityScore: 4,
      lat: 34.4219,
      lng: -118.5983,
      openedYear: 1988,
      queueTimesRideId: 2861,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'the-riddlers-revenge' }, // THE RIDDLER'S™ Revenge
    update: { queueTimesRideId: 2876, design: CoasterDesign.STAND_UP },
    create: {
      name: `THE RIDDLER'S™ Revenge`,
      slug: 'the-riddlers-revenge',
      parkId: magicMountain.id,
      manufacturer: 'Bolliger & Mabillard',
      type: CoasterType.STEEL,
      design: CoasterDesign.STAND_UP,
      heightFt: 156,
      dropFt: 146,
      speedMph: 65,
      inversions: 6,
      durationSec: 180,
      imageUrl: '/images/coasters/the_riddlers_revenge.jpg',
      intensityScore: 8,
      lat: 34.4245,
      lng: -118.6006,
      openedYear: 1998,
      queueTimesRideId: 2876,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'road-runner-express' }, // Road Runner Express
    update: { queueTimesRideId: 2864, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Road Runner Express',
      slug: 'road-runner-express',
      parkId: magicMountain.id,
      manufacturer: 'Vekoma',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 27.9,
      speedMph: 21.7,
      inversions: 0,
      durationSec: 44,
      imageUrl: '/images/coasters/road_runner_express.jpg',
      intensityScore: 2,
      lat: 34.4257,
      lng: -118.5958,
      openedYear: 2011,
      queueTimesRideId: 2864,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'scream' },          // SCREAM!
    update: { queueTimesRideId: 2868, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'SCREAM!',
      slug: 'scream',
      parkId: magicMountain.id,
      manufacturer: 'Bolliger & Mabillard',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 150,
      dropFt: 141,
      speedMph: 63,
      inversions: 7,
      durationSec: 180,
      imageUrl: '/images/coasters/scream.jpg',
      intensityScore: 7,
      lat: 34.4284,
      lng: -118.5986,
      openedYear: 2003,
      queueTimesRideId: 2868,
    },
  });
  

  await prisma.coaster.upsert({
    where: { slug: 'tatsu' },            // Tatsu
    update: { queueTimesRideId: 2872, design: CoasterDesign.FLYING },
    create: {
      name: 'Tatsu',
      slug: 'tatsu',
      parkId: magicMountain.id,
      manufacturer: 'Bolliger & Mabillard',
      type: CoasterType.STEEL,
      design: CoasterDesign.FLYING,
      heightFt: 170,
      dropFt: 111,
      speedMph: 62,
      inversions: 4,
      durationSec: 120,
      imageUrl: '/images/coasters/tatsu.jpg',
      intensityScore: 9,
      lat: 34.4219,
      lng: -118.5974,
      openedYear: 2006,
      queueTimesRideId: 2872,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'twisted-colossus' },    // Twisted Colossus
    update: { queueTimesRideId: 2889, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Twisted Colossus',
      slug: 'twisted-colossus',
      parkId: magicMountain.id,
      manufacturer: 'Rocky Mountain Construction',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 121,
      dropFt: 116,
      speedMph: 62,
      inversions: 2,
      durationSec: 180,
      imageUrl: '/images/coasters/twisted_colossus.jpg',
      intensityScore: 8,
      lat: 34.4275,
      lng: -118.598,
      openedYear: 2015,
      queueTimesRideId: 2889,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'viper' },               // Viper
    update: { queueTimesRideId: 2879, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Viper',
      slug: 'viper',
      parkId: magicMountain.id,
      manufacturer: 'Arrow Dynamics',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 188,
      dropFt: 171,
      speedMph: 70,
      inversions: 7,
      durationSec: 150,
      imageUrl: '/images/coasters/viper.jpg',
      intensityScore: 8,
      lat: 34.4208,
      lng: -118.5953,
      openedYear: 1990,
      queueTimesRideId: 2879,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'west-coast-racers' },      // West Coast Racers
    update: { queueTimesRideId: 6370, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'West Coast Racers',
      slug: 'west-coast-racers',
      parkId: magicMountain.id,
      manufacturer: 'Premier Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 67,
      speedMph: 55,
      inversions: 4,
      durationSec: 180,
      imageUrl: '/images/coasters/west_coast_racers.jpg',
      intensityScore: 6,
      lat: 34.4222,
      lng: -118.5996,
      openedYear: 2020,
      queueTimesRideId: 6370,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'wonder-woman-flight-of-courage' }, // WONDER WOMAN™ Flight of Courage
    update: { queueTimesRideId: 10135, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'WONDER WOMAN™ Flight of Courage',
      slug: 'wonder-woman-flight-of-courage',
      parkId: magicMountain.id,
      manufacturer: 'Rocky Mountain Construction',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 131,
      dropFt: 127,
      speedMph: 58,
      inversions: 3,
      durationSec: 49,
      imageUrl: '/images/coasters/wonder_woman_flight_of_courage.jpg',
      intensityScore: 7,
      lat: 34.4254,
      lng: -118.5999,
      openedYear: 2022,
      queueTimesRideId: 10135,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'x2' },                        // X2
    update: { queueTimesRideId: 2881, design: CoasterDesign.WING },
    create: {
      name: 'X2',
      slug: 'x2',
      parkId: magicMountain.id,
      manufacturer: 'Arrow Dynamics',
      type: CoasterType.STEEL,
      design: CoasterDesign.WING,
      heightFt: 175,
      dropFt: 215,
      speedMph: 76,
      inversions: 2,
      durationSec: 150,
      imageUrl: '/images/coasters/x2.jpg',
      intensityScore: 10,
      lat: 34.4216,
      lng: -118.593,
      openedYear: 2002,
      queueTimesRideId: 2881,
    },
  });

  // Universal Studios Hollywood
  const ush = await prisma.park.upsert({
    where: { slug: 'universal-studios-hollywood' },
    update: { queueTimesParkId: 66, region: 'LA' },
    create: {
      name: 'Universal Studios Hollywood',
      slug: 'universal-studios-hollywood',
      lat: 34.1381,
      lng: -118.3535,
      address: '100 Universal City Plaza, Universal City, CA 91608',
      queueTimesParkId: 66,
      region: 'LA',
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'flight-of-the-hippogriff' }, // Flight of the Hippogriff
    update: { queueTimesRideId: 6047, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Flight of the Hippogriff',
      slug: 'flight-of-the-hippogriff',
      parkId: ush.id,
      manufacturer: 'Mack Rides GmbH & Co KG',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 42.7,
      speedMph: 30,
      inversions: 0,
      durationSec: 48,
      imageUrl: '/images/coasters/flight_of_the_hippogriff.jpg',
      intensityScore: 3,
      lat: 34.1378,
      lng: -118.3536,
      openedYear: 2016,
      queueTimesRideId: 6047,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'revenge-of-the-mummy-the-ride' }, // Revenge Of The Mummy: The Ride
    update: { queueTimesRideId: 6050, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Revenge Of The Mummy: The Ride',
      slug: 'revenge-of-the-mummy-the-ride',
      parkId: ush.id,
      manufacturer: 'Premier Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 44.4,
      speedMph: 40,
      inversions: 0,
      durationSec: 120,
      imageUrl: '/images/coasters/revenge_of_the_mummy.jpg',
      intensityScore: 5,
      lat: 34.1406,
      lng: -118.3566,
      openedYear: 2004,
      queueTimesRideId: 6050,
    },
  });

  await prisma.coaster.upsert({
    where: { slug: 'fast-and-furious-hollywood-drift' }, // Fast & Furious: Hollywood Drift
    update: { queueTimesRideId: 17533, design: CoasterDesign.SIT_DOWN },
    create: {
      name: 'Fast & Furious: Hollywood Drift',
      slug: 'fast-and-furious-hollywood-drift',
      parkId: ush.id,
      manufacturer: 'Intamin Amusement Rides',
      type: CoasterType.STEEL,
      design: CoasterDesign.SIT_DOWN,
      heightFt: 170,
      speedMph: 72,
      inversions: 4,
      durationSec: 120,
      imageUrl: '/images/coasters/fast_and_furious_hollywood_drift.jpg',
      intensityScore: 8,
      lat: 34.1391,
      lng: -118.3549,
      openedYear: 2026,
      queueTimesRideId: 17533,
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