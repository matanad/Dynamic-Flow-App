import { TFlow, TStep, TStrapiResponse } from "@/types";
import qs from "qs";

export function getStrapiURL() {
  return "http://localhost:1337";
}

export const flowsQuery = qs.stringify({
  filters: {
    isActive: true,
  },
  populate: {
    startStep: {
      populate: "*",
    },
  },
});

export const getFlowQuery = (slug: string) => {
  return qs.stringify({
    filters: {
      isActive: true,
      slug: {
        $eq: slug,
      },
    },
    populate: {
      startStep: {
        populate: "*",
      },
    },
  });
};

export const getStepsQuery = (slug: string) => {
  return qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      nextStep: {
        fields: ["slug"],
      },
      nextStepNo: {
        fields: ["slug"],
      },
    },
  });
};

export async function getStrapiData<T>(
  path: string,
  query: string
): Promise<T[]> {
  const url = new URL(path, getStrapiURL());
  url.search = query;

  try {
    const response = await fetch(url.href, { cache: "no-store" });

    if (!response.ok) throw new Error("Failed to fetch strapi data");

    const json: TStrapiResponse<T> = await response.json();
    return json.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch strapi data");
  }
}

export async function getFlows(): Promise<TFlow[]> {
  return await getStrapiData<TFlow>("api/flows", flowsQuery);
}

export async function getStep(slug: string): Promise<TStep | null> {
  const steps = await getStrapiData<TStep>("api/steps", getStepsQuery(slug));

  return steps.length > 0 ? steps[0] : null;
}
