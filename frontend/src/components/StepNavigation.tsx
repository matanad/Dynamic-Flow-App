"use client";
import { TStep, TUserAnswer } from "@/types";

export interface IStepNavigation {
  step: TStep;
  isLoading: boolean;
  answers: TUserAnswer[];
  onNextStep: (nextSlug: string, choice: string) => void;
}

export default function StepNavigation({
  step,
  onNextStep,
  isLoading,
  answers,
}: IStepNavigation) {
  if (step.nextStep && step.nextStepNo)
    return (
      <div className="flex center gap-2">
        <button
          disabled={isLoading}
          className="bg-green-600 px-8 py-3 text-gray-50 transition disabled:opacity-50 rounded-lg"
          onClick={() => onNextStep(step.nextStep!.slug, "Yes")}
        >
          Yes
        </button>
        <button
          disabled={isLoading}
          className="bg-red-500 px-8 py-3 text-gray-50 transition disabled:opacity-50 rounded-lg"
          onClick={() => onNextStep(step.nextStepNo!.slug, "No")}
        >
          No
        </button>
      </div>
    );

  if (step.nextStep && !step.nextStepNo)
    return (
      <div>
        <button
          disabled={isLoading}
          className="bg-blue-600 text-gray-50 px-8 py-3 transition disabled:opacity-50 rounded-lg"
          onClick={() => onNextStep(step.nextStep!.slug, "Next")}
        >
          Next
        </button>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4">Thank you! 🥳</h1>
      <h2 className="mb-4 font-semibold">Your Choices:</h2>
      <ul>
        {answers.map((userChoice, index) => (
          <li
            key={index}
            className="flex mb-2 rounded justify-between p-4 bg-blue-950 text-gray-50"
          >
            <span>{userChoice.stepTitle}</span>
            <span>{userChoice.choice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
