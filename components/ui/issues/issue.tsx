import { EditIssue, CloseIssue, ClosedIssue, OpenState, ClosedState } from "./buttons";
import { getIssue, getIssueComments } from "@/app/lib/actions";
import Comment from "@/components/ui/comment/comment";

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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold">{title}</p>
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
          <p className="italic">{owner} opened this issue 2 weeks ago; {comments.length} comments</p>
        </div>
        <div className="border-t-2 border-gray-300"></div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {comments.map((comment: any) => {
          const commentInfo = {
            user: comment.user.login,
            avatarUrl: comment.user.avatar_url,
            body: comment.body,
            createdAt: comment.created_at
          }
          return (
            <Comment comment={commentInfo} key={comment.id} />
          )
          })}
      </div>
    </>
  )
}