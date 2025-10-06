import { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  value?: number;
  onChange: (value: number) => void;
}

const SCALE_LABELS = [
  { value: 0, label: "Slett ikke" },
  { value: 1, label: "Lite" },
  { value: 2, label: "Delvis" },
  { value: 3, label: "Mye" },
  { value: 4, label: "Det er meg!" }
];

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  value,
  onChange
}: QuestionCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900 mb-4">
          Spørsmål {questionNumber} av {totalQuestions}
        </legend>

        <div className="mb-6">
          <p className="text-gray-700 text-base leading-relaxed">
            {question.text}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Hvor godt beskriver dette deg?
          </p>

          {SCALE_LABELS.map(({ value: scaleValue, label }) => (
            <label
              key={scaleValue}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={scaleValue}
                checked={value === scaleValue}
                onChange={() => onChange(scaleValue)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 flex-1">
                <span className="font-medium">{scaleValue}</span> - {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
