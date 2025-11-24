import { getFlows } from "@/services/strapi";
import Link from "next/link";

export default async function Home() {
  const flows = await getFlows();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Flows:</h1>

      <ul className="grid gap-4 w-full max-w-md bg-gray-50 text-gray-950 p-8 rounded-sm">
        {flows &&
          flows.map((flow) => (
            <li key={flow.id}>
              <h2 className="text-3xl font-bold mb-8">{flow.name}</h2>
              <Link
                className="bg-blue-700 text-amber-50 px-8 py-3 rounded-sm cursor-pointer"
                href={`/flows/${flow.slug}`}
              >
                Start {flow.name}
              </Link>
            </li>
          ))}
        {flows.length === 0 && <p>No active flows found.</p>}
      </ul>
    </main>
  );
}
