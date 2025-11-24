"use client";

import { TStep, TUserAnswer } from "@/types";
import { useState } from "react";
import StepNavigation from "./StepNavigation";
import Spinner from "./Spinner";
import { getStep } from "@/services/strapi";

export interface IFlowManagerProps {
  initialStep: TStep;
}

export default function FlowManager({ initialStep }: IFlowManagerProps) {
  const [currentStep, setCurrentStep] = useState<TStep>(initialStep);
  const [answers, setAnswers] = useState<TUserAnswer[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleNextStep = async (nextSlug: string, choice: string) => {
    const newAnswer: TUserAnswer = {
      stepTitle: currentStep.title,
      choice,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    try {
      setIsLoading(true);

      const step = await getStep(nextSlug);

      if (step) setCurrentStep(step);
      else setIsError(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold mb-4">{currentStep.title}</h1>
      <p className="mb-4 font-semibold">{currentStep.body}</p>

      {isError && <div className="text-red-500 mb-4">Error loading step.</div>}
      {isLoading ? (
        <Spinner />
      ) : (
        <StepNavigation
          step={currentStep}
          onNextStep={handleNextStep}
          answers={answers}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
