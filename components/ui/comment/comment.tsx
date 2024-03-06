import Image from "next/image"
import { CommentType } from "@/app/lib/definitions"
import Markdown from "react-markdown";

export default function Comment({ comment } : { comment: CommentType}) {
  const { user, avatarUrl, body, createdAt } = comment;
  return (
    <div className="flex gap-4 items-start">
      <Image
        src={avatarUrl}
        alt={`${user} icon`}
        width={50}
        height={50}
        className="rounded-full"
      />
      {/* create border line around the div */}
      <div id="comment" className="flex grow flex-col gap-2 border-2 border-blue-300 rounded-md">
        <div id="comment-info" className="flex justify-between bg-blue-200 border-b-2 border-blue-300">
          <p>{user} commented 2 weeks ago</p>
        </div>
        <div id="comment-body" className="p-2">
          <Markdown>{body}</Markdown>
        </div>
      </div>
    </div>
  )
}