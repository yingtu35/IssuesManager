import { calculateTimeElapsed } from "@/app/lib/utils";
import { CommentType } from "@/app/lib/definitions"
import { UserIcon } from "../user/user-icon";
import Markdown from "react-markdown";

// : Add relation of commenters to issue
export default function Comment({ comment } : { comment: CommentType}) {
  const { user, avatarUrl, body, createdAt, htmlUrl } = comment;
  const timeElapsed = calculateTimeElapsed(createdAt);
  return (
    <div className="flex gap-4 items-start">
      <UserIcon user={{ name: user, avatarUrl, htmlUrl }} />
      {/* create border line around the div */}
      <div id="comment" className="flex grow flex-col gap-2 border-2 border-blue-300 rounded-md">
        <div id="comment-info" className="flex justify-between bg-blue-100 border-b-2 border-blue-300">
          <p className="p-2">{user} commented {timeElapsed}</p>
        </div>
        <div id="comment-body" className="p-2">
          <Markdown className="prose lg:prose-xl">{body}</Markdown>
        </div>
      </div>
    </div>
  )
}