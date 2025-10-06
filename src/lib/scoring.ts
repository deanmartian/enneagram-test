import { AnswerMap, EnneaTypeId, Scores, Question } from "@/types";
import questions from "@/data/questions.json";

export function computeScores(answers: AnswerMap): Scores {
  const scores = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0} as Scores;

  for (const q of questions) {
    const v = answers[q.id] ?? 0;           // 0–4
    const w = (q as Question).weight ?? 1;
    scores[q.type as EnneaTypeId] += v * w;
  }
  return scores;
}

export function topN(scores: Scores, n = 3): [EnneaTypeId, number][] {
  return (Object.entries(scores) as [string, number][])
    .sort((a,b)=> b[1]-a[1])
    .slice(0, n)
    .map(([k,v]) => [Number(k) as EnneaTypeId, v]);
}

// TODO: Implementer mer sofistikert scoring-algoritme senere
// TODO: Legg til vektjustering basert på type-kompatibilitet
// TODO: Vurder normalisering av resultater
