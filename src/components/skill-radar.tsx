"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface SkillRadarProps {
  scores: Array<{
    category: string;
    score: number;
  }>;
}

export function SkillRadar({ scores }: SkillRadarProps) {
  const data = scores.map((s) => ({
    subject: s.category,
    score: s.score,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid
          stroke="var(--ink)"
          strokeDasharray="3 3"
          strokeOpacity={0.3}
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: "var(--ink)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
          }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{
            fill: "var(--muted)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
          }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="var(--accent)"
          fill="var(--accent)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
