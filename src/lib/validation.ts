import { AnswerMap } from "@/types";

type SubmissionPayload = {
  email?: string;
  answers?: AnswerMap;
  timestamp?: string;
  type?: string;
};

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateAnswers(answers: AnswerMap): boolean {
  for (const value of Object.values(answers)) {
    if (typeof value !== 'number' || value < 0 || value > 4) {
      return false;
    }
  }
  return true;
}

export function validateSubmission(data: SubmissionPayload): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (data.email && !validateEmail(data.email)) {
    errors.push("Ugyldig e-postadresse");
  }

  if (data.answers && !validateAnswers(data.answers)) {
    errors.push("Ugyldige svar");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// TODO: Implementer Zod-validering for mer robust typing
// TODO: Legg til validering av spørsmåls-IDer mot questions.json
// TODO: Valider at alle påkrevde spørsmål er besvart
