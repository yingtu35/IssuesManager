import { Button } from "../button";
import Link from "next/link";
import { closeIssue } from "@/app/lib/actions";

export const CreateIssue = () => {
  return (
    <Link
      href="/dashboard/create"
      className="text-center"
    >
      <Button>+ Create Issue</Button>
    </Link>
  )
}

export const EditIssue = ({ owner, repo, id }: { owner: string, repo: string, id: string}) => {
  return (
    <Link href={`/dashboard/${owner}/${repo}/${id}/edit`} key={id}>
      <Button>Edit</Button>
    </Link>
  )
}

export const CloseIssue = ({ owner, repo, id }: { owner: string, repo: string, id: string}) => {
  const closeIssueWithParams = closeIssue.bind(null, owner, repo, id);
  return (
    <form action={closeIssueWithParams}>
      <Button className="bg-red-500 hover:bg-red-400">Close</Button>
    </form>
  )
}

export const ClosedIssue = () => {
  return <Button disabled={true} className="bg-gray-500 hover:bg-gray-500 active:bg-gray-500">Closed</Button>
}

export const CancelCreate = () => {
  return (
    <Link
      href="/dashboard"
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      Cancel
    </Link>
  )
}

export const CancelEdit = ({ owner, repo, id }: { owner: string, repo: string, id: string}) => {
  return (
    <Link
      href={`/dashboard/${owner}/${repo}/${id}`}
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      Cancel
    </Link>
  )
}

export const SubmitButton = ({ text } : {text: string | null}) => {
  return <Button type="submit">{text ? text : "Submit"}</Button>
}