// src/app/about/page.tsx

// Purpose: Contains the FAQ questions/responses and info about the site on
// the about page

import FaqAccordion from '@/components/FaqAccordion';

const faqs = [
  {
    question: 'Why did you make this?',
    answer:
      "I wanted a single place to check real coaster stats and live wait times across SoCal parks without having to go through each park's own app. By doing this, it is easier to see the wait times of all coasters in SoCal in a single place!",
  },
  {
    question: 'Is this affiliated with any of the parks?',
    answer:
      'No. This is an independent, unofficial project and isn\'t affiliated with, endorsed by, or connected to Disneyland, Knott\'s Berry Farm, LEGOLAND, SeaWorld, Universal Studios, Six Flags, or any other park mentioned on this site.',
  },
  {
    question: 'Where do the live wait times come from?',
    answer:
      'Live wait times and open/closed status are pulled from Queue-Times.com, a free public API that aggregates data from participating parks. Times refresh every few minutes and may occasionally lag behind what you see in the park.',
  },
  {
    question: 'Where do the coaster photos come from?',
    answer:
      'Photos are sourced from public-domain and Creative Commons-licensed images, primarily via Wikimedia Commons. Note that photos may be outdated, and each coaster may look slightly different compared each the photo. If you believe an image is used incorrectly, please contact: arechiganoah@gmail.com.',
  },
  {
    question: 'Where do the coaster stats and specs come from, and how accurate are they?',
    answer:
      'I received each coaster stat and spec from RCDB (Rollercoaster Database). I used LatLong.net to research the latitude and longitude for each coaster. Most stats/specs should be accurate, but if you notice any are innacurate, please contact: arechiganoah@gmail.com.'
  },
  {
    question: 'How is the intensity score decided?',
    answer:
      "Intensity is a curated 1-10 score I assign based on a coaster's height, speed, inversions, forces, and overall reputation. So it's a judgment call, not an official industry metric, so you may not always agree with it!",
  },
  {
    question: 'Why only Southern California?',
    answer:
      "I started local in SoCal, since I was most familiar with the coasters and theme parks in this area. This made the data entry more accurate and hand-curated. With more resources, I would plan to expand this site to more theme parks and coasters in NorCal and across California.",
  },
  {
    question: 'What tech is this built with?',
    answer:
      'Next.js and TypeScript for the site, PostgreSQL with Prisma for the database, Leaflet for the map, and it\'s hosted on Vercel. Coaster and park data is manually curated and cross-referenced with RCDB and each ride\'s official specs.',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-full px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-royal mb-3">About</p>
        <h1 className="text-5xl mb-8">Why This Site Exists</h1>

        <p className="font-body text-lg text-navy-950/80 leading-relaxed mb-6">
          As a SoCal native and roller coaster enthusiast, I enjoy frequently looking at all the stats 
          of coasters I grew up with, along with the wait times. However, I noticed in order
          to see the wait times for all of these coasters, you would have to download the app for
          each theme park. I decided  to build a unified site that allows you to see the wait times
          for all SoCal theme parks, without needing to download any apps for it.
        </p>
        <p className="font-body text-lg text-navy-950/80 leading-relaxed mb-16">
          I hope that people will use this site as an alternative to not only not having
          to download so many apps, but also being more familiarized with the abudance of coasters
          SoCal has to offer. In the future, I would like to add more coasters and wait times
          from theme parks in the NorCal area, and all across California in general. Thank you for using
          CalCoasters!
        </p>

        <h2 className="text-3xl mb-6">Frequently Asked Questions</h2>
        <FaqAccordion items={faqs} />
      </div>
    </main>
  );
}