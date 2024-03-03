import Markdown from "react-markdown";
import { EditIssue, CloseIssue, ClosedIssue } from "./buttons";
import { getIssue, getIssueComments } from "@/app/lib/actions";

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
  const [issue, comments] = await Promise.all([
    getIssue(owner, repo, id),
    getIssueComments(owner, repo, id)
  ]);
  const { title, body, state } = issue;
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1>Title: {title}</h1>
          <p>State: {state}</p>
        </div>
        { state === "open" ? (
          <div className="flex gap-4">
            <EditIssue owner={owner} repo={repo} id={id} />
            <CloseIssue owner={owner} repo={repo} id={id} />
          </div>
        ) : (
          <ClosedIssue />
        )}
      </div>
      <br />
      <p>Body: </p>
      <Markdown>{body}</Markdown>
      <br />
      <h2>Comments</h2>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>
            <p>{comment.user.login}: {comment.body}</p>
          </li>
        ))}
      </ul>
    </>
  )
}