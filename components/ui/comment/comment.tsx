import Image from "next/image"
import { calculateTimeElapsed } from "@/app/lib/utils";
import { CommentType } from "@/app/lib/definitions"
import Markdown from "react-markdown";

export default function Comment({ comment } : { comment: CommentType}) {
  const { user, avatarUrl, body, createdAt, htmlUrl } = comment;
  const timeElapsed = calculateTimeElapsed(createdAt);
  return (
    <div className="flex gap-4 items-start">
      <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={avatarUrl}
          alt={`${user} icon`}
          width={50}
          height={50}
          className="rounded-full border-2 border-blue-200"
        />
      </a>
      {/* create border line around the div */}
      <div id="comment" className="flex grow flex-col gap-2 border-2 border-blue-300 rounded-md">
        <div id="comment-info" className="flex justify-between bg-blue-100 border-b-2 border-blue-300">
          <p className="p-2">{user} commented {timeElapsed}</p>
        </div>
        <div id="comment-body" className="p-2">
          <Markdown>{body}</Markdown>
        </div>
      </div>
    </div>
  )
}