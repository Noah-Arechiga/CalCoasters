// src/lib/queue-times.ts

// Purpose: talks to the external Queue-Times.com API and shapes the response
// into something simple for the rest of our app to use. Logic us that
// in one file means if Queue-Times ever changes their API shape, it is only
// fixed here

export interface QueueTimesRide {
  id: number;
  name: string;
  is_open: boolean;
  wait_time: number;
  last_updated: string;
}

interface QueueTimesLand {
  id: number;
  name: string;
  rides: QueueTimesRide[];
}

interface QueueTimesResponse {
  lands: QueueTimesLand[];
  rides?: QueueTimesRide[]; // Some parks return rides flat, without lands
}

/**
 * Fetches live wait times for a single park from Queue-Times.com,
 * and flattens the land/ride nesting into one simple array
 */
export async function getParkWaitTimes(
  queueTimesParkId: number
): Promise<QueueTimesRide[]> {
  const res = await fetch(
    `https://queue-times.com/parks/${queueTimesParkId}/queue_times.json`,
    {
      // Cache this response for 5 minutes: matches how often
      // Queue-Times itself refreshes data, so not hammering
      // API on every page load
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Queue-Times API request failed for park ${queueTimesParkId}: ${res.status}`
    );
  }

  const data: QueueTimesResponse = await res.json();

  const fromLands = data.lands?.flatMap((land) => land.rides) ?? [];
  const flat = data.rides ?? [];

  return [...fromLands, ...flat];
}

/**
 * Given all rides returned for a park, find the wait time for one
 * specific ride by its Queue-Times ride ID
 */
export function findRideWaitTime(
  rides: QueueTimesRide[],
  queueTimesRideId: number
): QueueTimesRide | undefined {
  return rides.find((ride) => ride.id === queueTimesRideId);
}