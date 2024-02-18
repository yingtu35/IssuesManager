import Markdown from "react-markdown";
import { getIssue } from "@/app/lib/actions";

export default async function Page({ 
  params 
}: { 
  params: { 
    owner: string,
    repo: string,
    id: string
  }
}) {
  const { owner, repo, id } = params;
  const issue = await getIssue(owner, repo, id);
  return (
    <div>
      <h1>Title: {issue.title}</h1>
      <p>State: {issue.state}</p>
      <br />
      <p>Body: </p>
      <Markdown>{issue.body}</Markdown>
    </div>
  )
}
