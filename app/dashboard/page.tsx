import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IssuesSearchParams } from "@/app/lib/definitions";
import Breadcrumbs from "@/components/ui/issues/breadcrumbs";
import Filtering from "@/components/ui/filtering";
import Sorting from "@/components/ui/sorting";
import Issues from "@/components/ui/issues/issues";

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

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Issues', href: '/dashboard', active: true}
        ]}
      />
      <div>
        {/* <h1 className="text-4xl font-bold text-center">Issues</h1> */}
        <div className="flex items-center justify-between gap-2">
          <Filtering />
          <Sorting />
          <Link
            href="/dashboard/create"
            className="text-center"
          >
            <Button>+ Create Issue</Button>
          </Link>
        </div>

        <Issues searchParams={searchParams} />
      </div>
    </main>
  );
}