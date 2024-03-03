import { Metadata } from "next";
import { IssuesSearchParams } from "@/app/lib/definitions";
import Breadcrumbs from "@/components/ui/issues/breadcrumbs";
import Filtering from "@/components/ui/filtering";
import Sorting from "@/components/ui/sorting";
import Issues from "@/components/ui/issues/issues";
import { CreateIssue } from "@/components/ui/issues/buttons";

export const metadata: Metadata = {
  title: "Dashboard",
};

// TODO: Add a layout component to wrap the content
// TODO: Add dashboard skeleton
// TODO: Design issue card layout for dashboard
// TODO: Add issue card component, skeleton
// TODO: Add create issue skeleton
// TODO: render body content as markdown
export default async function Dashboard({
  searchParams
} : {
  searchParams: IssuesSearchParams
}) {
  const { state, direction } = searchParams;

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
          <Filtering initialState={state} />
          <Sorting initialDirection={direction} />
          <CreateIssue />
        </div>

        <Issues searchParams={searchParams} />
      </div>
    </main>
  );
}