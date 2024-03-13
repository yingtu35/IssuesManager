import { Metadata } from "next";
import { IssuesSearchParams } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/components/ui/issues/breadcrumbs";
import Issues from "@/app/components/ui/issues/issues";
import Toolbar from "@/app/components/ui/toolbar";
import { IssuesSkeleton } from "@/app/components/ui/skeletons";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard shows all issues assigned to authenticated user."
};

// TODO: Add a layout component to wrap the content
// TODO: Add dashboard skeleton
// TODO: Add create issue skeleton
// TODO: Add an error page when fetch issues fails
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
      <div className="flex flex-col gap-4">
        <Toolbar searchParams={searchParams} />
        <Suspense fallback={<IssuesSkeleton />}>
          <Issues searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}