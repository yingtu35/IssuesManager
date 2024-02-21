import { Metadata } from "next";
import FilteredIssuesTable from "@/components/ui/issues/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getIssues } from "@/app/lib/actions";
import { IssuesSearchParams } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Dashboard",
};

// TODO: Add a layout component to wrap the content
// TODO: render body content as markdown
// TODO: add a loading spinner while fetching issues
// TODO: add sorting and filter functionality, use query params to filter issues
export default async function Dashboard({
  searchParams
} : {
  searchParams: IssuesSearchParams
}) {
  const [issues, nextPageUrl] = await getIssues(searchParams);

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
        <FilteredIssuesTable initialIssues={issues} searchParams={searchParams} nextPageUrl={nextPageUrl} />
      </div>
    </main>
  );
}