import { getIssues } from "@/app/lib/actions";
import Link from "next/link";

// TODO: add query as props
export default async function FilteredIssuesTable() {
  const issues = await getIssues();
  // console.log(issues);
  
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>State</th>
          <th>Author</th>
          <th>Created At</th>
          <th>Link</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue: any) => (
            <tr key={issue.id}>
              <td>{issue.title}</td>
              <td>{issue.state}</td>
              <td>{issue.user.login}</td>
              <td>{issue.created_at}</td>
              <td>
                <Link href={`/dashboard/${issue.user.login}/${issue.repository.name}/${issue.number}`} key={issue.id}>
                  <p>View</p>
                </Link>
              </td>
              <td>
                <Link href={`/dashboard/${issue.user.login}/${issue.repository.name}/${issue.number}/edit`} key={issue.id}>
                  <p>Edit</p>
                </Link>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}