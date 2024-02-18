import { Metadata } from "next";
import FilteredIssuesTable from "@/components/ui/issues/table";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

// TODO: Add a layout component to wrap the content
// TODO: Send a request to fetch all user's issues
// TODO: Display the issues in a table
export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Issues</h1>
        <Link
          href="/dashboard/create"
          className="text-center"
        >
          + Create Issue
        </Link>
        <FilteredIssuesTable />
      </div>
    </main>
  );
}