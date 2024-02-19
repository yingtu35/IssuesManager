import { getIssues } from "@/app/lib/actions";
import { formatDateToLocal } from "@/app/lib/utils";
import Link from "next/link";

// TODO: add query as props
export default async function FilteredIssuesTable() {
  const issues = await getIssues();
  // console.log(issues);
  
  return (
    <table>
      <thead>
        <tr>
          <th scope="col" className="px-4 py-5 font-medium">Title</th>
          <th scope="col" className="px-4 py-5 font-medium">State</th>
          {/* <th scope="col" className="px-4 py-5 font-medium">Author</th> */}
          <th scope="col" className="px-4 py-5 font-medium">Created At</th>
          <th scope="col" className="px-4 py-5 font-medium">Link</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue: any) => (
            <tr key={issue.id}>
              <td>{issue.title}</td>
              <td>{issue.state}</td>
              {/* <td>{issue.user.login}</td> */}
              <td>{formatDateToLocal(issue.created_at)}</td>
              <td>
                <Link href={`/dashboard/${issue.user.login}/${issue.repository.name}/${issue.number}`} key={issue.id}>
                  <p>View</p>
                </Link>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}