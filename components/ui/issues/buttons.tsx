import { Button } from "../button";
import Link from "next/link";
import { closeIssue } from "@/app/lib/actions";
import { CheckCircleIcon, MinusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

export const CreateIssue = () => {
  return (
    <Link
      href="/dashboard/create"
      className="text-center"
    >
      <Button className="pl-2 pr-4">
        <PlusIcon className="h-4 w-4" />
        Create Issue
      </Button>
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

export const OpenState = () => {
  return <Button 
          disabled={true} 
          className="rounded-3xl bg-green-500 hover:bg-green-500 active:bg-green-500 pl-3 pr-4">
            <MinusCircleIcon className="h-4 w-4 mr-1" />
            Open
          </Button>
}

export const ClosedState = () => {
  return <Button 
  disabled={true} 
  className="rounded-3xl bg-purple-500 hover:bg-purple-500 active:bg-purple-500 pl-3 pr-4">
            <CheckCircleIcon className="h-4 w-4 mr-1" />
            Closed
          </Button>
}