import FlowManager from "@/components/FlowManager";
import { getFlows } from "@/services/strapi";
import Link from "next/link";

export interface IFlowPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FlowPage({ params }: IFlowPageProps) {
  const { slug } = await params;
  const flows = await getFlows();
  const currentFlow = flows.find((f) => f.slug === slug);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href={"/"}>Return to flows</Link>
      <div className="grid gap-4 w-full max-w-md bg-gray-50 text-gray-950 p-8 rounded-sm">
        {!currentFlow || !currentFlow.startStep ? (
          <>
            <h1 className="text-red-500 mb-4">Error loading flow</h1>
            <Link href={"/"} className="p-4 bg-blue-950 text-gray-50 rounded">Return to flows</Link>
          </>
        ) : (
          <FlowManager initialStep={currentFlow.startStep} />
        )}
      </div>
    </main>
  );
}
