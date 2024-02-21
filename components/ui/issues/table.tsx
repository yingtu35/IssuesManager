"use client"

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { formatDateToLocal } from "@/app/lib/utils";
import Link from "next/link";
import { IssuesSearchParams } from "@/app/lib/definitions";
import { getMoreIssues } from "@/app/lib/actions";

// TODO: add query as props
// TODO: pass initial issues to the component
// TODO: keep a page state to retrieve more issues
// TODO: keep a hasMore state to check if there are more issues to retrieve
// TODO: Using a hidden tag, such as a span, placed at the end of an array.map output, when the user scrolls down and reaches the span, inView becomes true and triggers a call to the database to retrieve additional array elements which are then displayed on the page.
export default function FilteredIssuesTable({
  initialIssues, 
  searchParams,
  nextPageUrl
}: {
  initialIssues: any[],
  searchParams: IssuesSearchParams,
  nextPageUrl: string | null
}) {
  const { ref, inView, entry } = useInView();
  const [issues, setIssues] = useState(initialIssues);
  const [nextPage, setNextPage] = useState(nextPageUrl);

  // add a useEffect to fetch more issues when inView is true
  useEffect(() => {
    async function fetchMoreIssues() {
      if (inView) {
        console.log("fetch more issues");
        if (nextPage) {
          const [moreIssues, nextUrl] = await getMoreIssues(nextPage);
          setIssues([...issues, ...moreIssues]);
          setNextPage(nextUrl);
        }
      }
    }
    fetchMoreIssues();
  }, [inView]);
  
  return (
    <table>
      <thead>
        <tr>
          <th scope="col" className="px-4 py-5 font-medium">
            Title
          </th>
          <th scope="col" className="px-4 py-5 font-medium">
            State
          </th>
          {/* <th scope="col" className="px-4 py-5 font-medium">Author</th> */}
          <th scope="col" className="px-4 py-5 font-medium">
            Created At
          </th>
          <th scope="col" className="px-4 py-5 font-medium">
            Link
          </th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue: any, index: Number) => (
          <tr key={issue.id} className="py-10">
            <td className="py-10">{issue.title}</td>
            <td>{issue.state}</td>
            {/* <td>{issue.user.login}</td> */}
            <td>{formatDateToLocal(issue.created_at)}</td>
            <td>
              <Link href={`/dashboard/${issue.user.login}/${issue.repository.name}/${issue.number}`} key={issue.id}>
                <p>View</p>
              </Link>
              { index === issues.length - 1 && (
                <span ref={ref} id="issue-end-tag" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}