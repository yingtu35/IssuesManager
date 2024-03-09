import { IssuesSearchParams } from "@/app/lib/definitions";
import Filtering from "@/app/components/ui/queries/filtering";
import Direction from "@/app/components/ui/queries/direction";
import Sorting from "@/app/components/ui/queries/sorting";
import DateSince from "@/app/components/ui/queries/dateSince";
import ResetToolbar from "./reset-toolbar";
import { CreateIssue } from "@/app/components/ui/issues/buttons";

export default function Toolbar({
  searchParams
} : {
  searchParams: IssuesSearchParams
}) {
  const { state, direction, sort } = searchParams;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Filtering initialState={state} />
        <Direction initialDirection={direction} />
        <Sorting initialSort={sort} />
      </div>
      {/* <DateSince initialSince={since} /> */}
      <div className="flex items-center gap-2">
        <ResetToolbar />
        <CreateIssue />
      </div>
    </div>
  )
}