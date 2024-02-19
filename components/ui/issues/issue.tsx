import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getIssue, closeIssue } from "@/app/lib/actions";

export default async function Issue({
  params, 
}: {
  params: {
    owner: string,
    repo: string,
    id: string
  },
}){
  const { owner, repo, id } = params;
  const issue = await getIssue(owner, repo, id);
  const { title, body, state } = issue;
  const closeIssueWithParams = closeIssue.bind(null, owner, repo, id);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1>Title: {title}</h1>
          <p>State: {state}</p>
        </div>
        { state === "open" && (
          <div className="flex">
            <Link href={`/dashboard/${owner}/${repo}/${id}/edit`} key={id}>
              <Button disabled={state !== "open"}>Edit</Button>
            </Link>
            <form action={closeIssueWithParams}>
              <Button className="bg-red-500 hover:bg-red-400">Close</Button>
            </form>
          </div>
        )}
      </div>
      <br />
      <p>Body: </p>
      <Markdown>{body}</Markdown>
    </>
  )
}