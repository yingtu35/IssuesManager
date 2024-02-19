import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Issue({
  params, 
  issue
}: {
  params: {
    owner: string,
    repo: string,
    id: string
  },
  issue: any
}){
  const { owner, repo, id } = params;
  const { title, body, state } = issue;
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1>Title: {title}</h1>
          <p>State: {state}</p>
        </div>
        <div className="flex">
          <Link href={`/dashboard/${owner}/${repo}/${id}/edit`} key={id}>
            <Button disabled={state !== "open"}>Edit</Button>
          </Link>
          { state === "open" && (
            <Link href={`/dashboard/${owner}/${repo}/${id}/close`} key={id}>
              <Button className="bg-red-500 hover:bg-red-400">Close</Button>
            </Link>
          )}
        </div>
      </div>
      <br />
      <p>Body: </p>
      <Markdown>{body}</Markdown>
    </>
  )
}