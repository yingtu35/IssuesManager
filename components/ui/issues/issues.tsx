import { getIssues } from "@/app/lib/actions";
import { IssuesSearchParams } from "@/app/lib/definitions";
import FilteredIssuesTable from "@/components/ui/issues/table";

export default async function Issues({ searchParams } : { searchParams: IssuesSearchParams }) {
  const [issues, nextPageUrl] = await getIssues(searchParams);

  return (
    <FilteredIssuesTable initialIssues={issues} nextPageUrl={nextPageUrl} />
  );
}