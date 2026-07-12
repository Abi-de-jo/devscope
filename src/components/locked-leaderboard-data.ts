/**
 * Fake leaderboard rows for the locked preview.
 * Plausible Indian developer names + scores.
 * Row #2 is marked as "partially legible" — it should be rendered with
 * less blur than the rest to create an eye-catching "almost readable" pull.
 */

export interface FakeLeaderboardRow {
  rank: number;
  name: string;
  username: string;
  topSkill: string;
  score: number;
  stars: number;
  /** If true, this row renders with reduced blur (2px instead of 6px) */
  partiallyLegible?: boolean;
}

export const FAKE_ROWS: FakeLeaderboardRow[] = [
  { rank: 1, name: "Priya Sharma", username: "priya-sharma", topSkill: "Architecture", score: 94, stars: 312 },
  { rank: 2, name: "Arjun Mehta", username: "arjunm-dev", topSkill: "Backend", score: 91, stars: 247, partiallyLegible: true },
  { rank: 3, name: "Deepa Nair", username: "deepa-n", topSkill: "Testing", score: 89, stars: 198 },
  { rank: 4, name: "Karthik Raj", username: "karthik-raj", topSkill: "Frontend", score: 87, stars: 176 },
  { rank: 5, name: "Ananya Iyer", username: "ananya-iyer", topSkill: "Security", score: 85, stars: 164 },
  { rank: 6, name: "Vikram Patel", username: "vikram-p", topSkill: "DevOps", score: 83, stars: 152 },
  { rank: 7, name: "Meera Krishnan", username: "meera-k", topSkill: "Code Quality", score: 81, stars: 138 },
  { rank: 8, name: "Rahul Gupta", username: "rahul-g-dev", topSkill: "Architecture", score: 79, stars: 121 },
  { rank: 9, name: "Sneha Reddy", username: "sneha-reddy", topSkill: "Documentation", score: 77, stars: 109 },
  { rank: 10, name: "Aditya Bose", username: "aditya-bose", topSkill: "Maintainability", score: 75, stars: 96 },
];

export const FAKE_LOCATION = "Chennai";
export const FAKE_TOTAL = 127;
