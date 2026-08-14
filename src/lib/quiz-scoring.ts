// src/lib/quiz-scoring.ts

// Purpose: Takes the user's quiz answers and a list of coasters, and
// returns those coasters sorted by how well they match, plus a rough
// "match %" for display. Pure functions, no API calls, easy to tune

export interface QuizAnswers {
  targetIntensity: number; // 1-10, from the "how intense" question
  inversionPref: 'none' | 'some' | 'love';
  heightPref: 'low' | 'no-preference' | 'high';
}

export interface ScorableCoaster {
  id: string;
  intensityScore: number;
  inversions: number;
  heightFt: number | null;
}

export function scoreCoaster(
  coaster: ScorableCoaster,
  answers: QuizAnswers
): number {
  let score = 100;

  // Intensity match: closer to target = better. Each point of
  // difference costs 10, so being 3 points off costs 30
  score -= Math.abs(coaster.intensityScore - answers.targetIntensity) * 10;

  // Inversions preference
  if (answers.inversionPref === 'none' && coaster.inversions > 0) {
    score -= 25 + coaster.inversions * 5; // Scales with how many
  }
  if (answers.inversionPref === 'love') {
    score += coaster.inversions * 6; // Reward more inversions
  }
  // 'Some' is neutral -> no adjustment either way

  // Height preference —> only applies if coaster's height is known
  if (coaster.heightFt !== null) {
    if (answers.heightPref === 'low' && coaster.heightFt > 100) {
      score -= (coaster.heightFt - 100) * 0.2;
    }
    if (answers.heightPref === 'high' && coaster.heightFt > 100) {
      score += (coaster.heightFt - 100) * 0.15;
    }
  }

  return score;
}

export function rankCoasters<T extends ScorableCoaster>(
  coasters: T[],
  answers: QuizAnswers
): (T & { score: number; matchPercent: number })[] {
  const scored = coasters.map((c) => ({
    ...c,
    score: scoreCoaster(c, answers),
  }));

  const maxScore = Math.max(...scored.map((c) => c.score), 1);

  const withPercent = scored.map((c) => ({
    ...c,
    // Clamp to 0-100 for a clean display percentage, relative to
    // the best-scoring coaster in this result set
    matchPercent: Math.max(
      0,
      Math.min(100, Math.round((c.score / maxScore) * 100))
    ),
  }));

  return withPercent.sort((a, b) => b.score - a.score);
}