import { EditIssue, CloseIssue, ClosedIssue, OpenState, ClosedState } from "./buttons";
import { getIssue, getIssueComments } from "@/app/lib/actions";
import { IssueBodyType } from "@/app/lib/definitions";
import { calculateTimeElapsed } from "@/app/lib/utils";
import CommentsTable from "../comment/table";

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
  const [issue, [comments, nextPageUrl]] = await Promise.all([
    getIssue(owner, repo, id),
    getIssueComments(owner, repo, id)
  ]);
  const { title, state } = issue;
  const issueInfo = {
    ...issue,
    repository: repo
  }
  const issueBody = {
    user: issue.user.login,
    avatarUrl: issue.user.avatar_url,
    body: issue.body,
    createdAt: issue.created_at,
    htmlUrl: issue.user.html_url
  } as IssueBodyType;
  const timeElapsed = calculateTimeElapsed(issue.created_at);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="hidden md:block flex justify-between items-center">
          <p className="text-4xl font-bold">{title}</p>
          { state === "open" && (
            <div className="mt-1 flex gap-4">
              <EditIssue owner={owner} repo={repo} id={id} />
              <CloseIssue owner={owner} repo={repo} id={id} />
            </div>
            )
          }
        </div>
        <div className="block md:hidden flex flex-col items-start gap-2">
          <p className="text-2xl font-bold">{title}</p>
          { state === "open" && (
            <div className="flex gap-4">
              <EditIssue owner={owner} repo={repo} id={id} />
              <CloseIssue owner={owner} repo={repo} id={id} />
            </div>
            )
          }
        </div>
        <div className="flex gap-4 items-center">
          { state === "open" ? <OpenState /> : <ClosedState />}
          <p className="italic">{owner} opened this issue {timeElapsed}; {comments.length} comments</p>
        </div>
        <div className="border-t-2 border-gray-300"></div>
      </div>
      <CommentsTable issueBody={issueBody} initialComments={comments} nextPageUrl={nextPageUrl} />
    </>
  )
}