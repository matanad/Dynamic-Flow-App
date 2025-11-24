export type TFlow = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  isActive: boolean;
  startStep?: TStep;
};

export type TStep = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  body: string;
  type: "info" | "question";
  nextStep?: TStep | null;
  nextStepNo?: TStep | null;
};

export type TStrapiResponse<T = null> = {
  success: boolean;
  data: T[];
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  status: number;
};

export type TUserAnswer = {
  stepTitle: string;
  choice: string;
};
