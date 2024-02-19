import { Metadata } from "next";
import FilteredIssuesTable from "@/components/ui/issues/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
};

// TODO: Add a layout component to wrap the content
export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Issues</h1>
        <Link
          href="/dashboard/create"
          className="text-center"
        >
          <Button>+ Create Issue</Button>
        </Link>
        <FilteredIssuesTable />
      </div>
    </main>
  );
}