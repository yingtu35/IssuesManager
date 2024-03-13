"use client"

import { IssueBodyType } from "@/app/lib/definitions";
import { useInView } from "react-intersection-observer";
import useComments from "@/app/hooks/useComments";
import Comment from "./comment";
import { CommentsSkeleton } from "../skeletons";

export default function CommentsTable({
  issueBody,
  initialComments,
  nextPageUrl
}: {
  issueBody: IssueBodyType,
  initialComments: any[],
  nextPageUrl: string | null
}) {
  const { ref, inView, entry } = useInView();
  const { comments, nextPage } = useComments(inView, initialComments, nextPageUrl);
  return (
    <div className="flex flex-col gap-20 mt-4">
      <Comment comment={issueBody} />
      {comments.map((comment: any) => {
        const commentInfo = {
          user: comment.user.login,
          avatarUrl: comment.user.avatar_url,
          body: comment.body,
          createdAt: comment.created_at,
          htmlUrl: comment.user.html_url
        } as IssueBodyType;
        return (
            <Comment comment={commentInfo} key={comment.id} />
        )
        })}
      <div>
      <span ref={ref} id="issue-end-tag" />
        { inView && nextPage && (
          <div className="flex flex-col gap-4">
            <CommentsSkeleton />
          </div>
          )
        }
      </div>
    </div>
  )
}