import { Button, TabButton } from "../button";
import Link from "next/link";
import { closeIssue } from "@/app/lib/actions";
import { CheckCircleIcon, MinusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";

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
      <Button className="bg-red-500 hover:bg-red-400 active:bg-red-600">Close</Button>
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
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-200"
    >
      Cancel
    </Link>
  )
}

export const CancelEdit = ({ owner, repo, id }: { owner: string, repo: string, id: string}) => {
  return (
    <Link
      href={`/dashboard/${owner}/${repo}/${id}`}
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-200"
    >
      Cancel
    </Link>
  )
}

export const SubmitButton = ({ text, disabled } : {text: string | null, disabled?: boolean}) => {
  return <Button 
            type="submit" 
            disabled={disabled}
            className={disabled ? "bg-gray-100 hover:bg-gray-100 active:bg-gray-100" : ""}
          >
            {text ? text : "Submit"}
          </Button>
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

export const WriteButton = ({ 
  onClick, 
  className 
} : { 
  onClick: MouseEventHandler<HTMLButtonElement>
  className: string
}) => {
  return (
    <TabButton type="button" className={className} onClick={onClick}>Write</TabButton>
  )
}

export const PreviewButton = ({ 
  onClick, 
  className 
} : { 
  onClick: MouseEventHandler<HTMLButtonElement>
  className: string
}) => {
  return (
    <TabButton type="button" className={className} onClick={onClick}>Preview</TabButton>
  )
}

export const GoBackButton = () => {
  return (
    <Button
      className="mt-4 rounded-md bg-gray-100 px-4 py-2 text-sm text-black transition-colors hover:bg-gray-200"
      onClick={() => window.history.back()}>
      Go Back
    </Button>
  )
}

export const TryAgainButton = ({ reset }: { reset: () => void }) => {
  return (
    <Button
      className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      onClick={
        // Attempt to recover by trying to re-render the invoices route
        () => reset()
      }
    >
      Try again
    </Button>
  )
}