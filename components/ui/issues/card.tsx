import Link from "next/link";
import { OpenState, ClosedState } from "./buttons";

export default function Card({
  user,
  title,
  repo,
  number,
  state,
  createdAt,
  updatedAt,
} : {
  user: string,
  title: string,
  repo: string,
  number: string,
  state: string,
  createdAt: string,
  updatedAt: string,
}) {
  return (
    <Link href={`/dashboard/${user}/${repo}/${number}`}>
      <div className="rounded-xl bg-gray-300 p-2 shadow-sm transition-colors duration-200 ease-in hover:bg-gray-400 hover:shadow-lg">
        <div className="flex justify-between items-start p-2">
          <div className="flex flex-col gap-2">
            <p className="text-4xl"><strong>{title}</strong></p>
            <p className="text-slate-600">{repo} #{number}</p>
          </div>
          { state === "open" ? <OpenState /> : <ClosedState /> }
        </div>
        <div className="mt-2 flex justify-start gap-4 p-2">
          <p className="text-sm italic">Created: {createdAt} / Updated: {updatedAt}</p>
        </div>
      </div>
    </Link>
  );
}