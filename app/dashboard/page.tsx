import { Metadata } from "next";
import { getIssues } from "@/app/lib/actions";

export const metadata: Metadata = {
  title: "Dashboard",
};

// TODO: Add a layout component to wrap the content
// TODO: Send a request to fetch all user's issues
export default async function Dashboard() {
  const issues = await getIssues();
  console.log(issues);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Welcome to Next.js</h1>
        <p className="text-center">
          Successfully authenticated and redirected to the dashboard.
        </p>
      </div>
    </main>
  );
}