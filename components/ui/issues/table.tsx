"use client"

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { formatDateToLocal } from "@/app/lib/utils";
import Link from "next/link";
import { getMoreIssues } from "@/app/lib/actions";
import { MagnifyingGlass } from "react-loader-spinner";
import Card from "./card";

// TODO: change loading spinner to skeleton loader
export default function FilteredIssuesTable({
  initialIssues, 
  nextPageUrl
}: {
  initialIssues: any[],
  nextPageUrl: string | null
}) {
  const { ref, inView, entry } = useInView();
  const [issues, setIssues] = useState(initialIssues);
  const [nextPage, setNextPage] = useState(nextPageUrl);

  useEffect(() => {
    console.log("nextPageUrl:", nextPageUrl);
    setIssues(initialIssues);
    setNextPage(nextPageUrl); // Provide a default value of an empty string if nextPageUrl is null
  }, [initialIssues, nextPageUrl]);

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
    <>
      <div className="flex flex-col gap-4">
        {issues.map((issue: any, index: Number) => (
          <Card
            key={issue.id}
            user={issue.user.login}
            title={issue.title}
            repo={issue.repository.name}
            number={issue.number}
            state={issue.state}
            createdAt={formatDateToLocal(issue.created_at)}
            updatedAt={formatDateToLocal(issue.updated_at)}
          />
        ))}
      </div>
      <div className="flex justify-center">
        { inView && nextPage && (
          <MagnifyingGlass
            visible={true}
            height="120"
            width="120"
            ariaLabel="magnifying-glass-loading"
            glassColor="white"
            color="black"
            />
            )}
        <span ref={ref} id="issue-end-tag" />
      </div>
    </>
  )
  
  // return (
  //   <>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th scope="col" className="px-4 py-5 font-medium">
  //             Title
  //           </th>
  //           <th scope="col" className="px-4 py-5 font-medium">
  //             State
  //           </th>
  //           {/* <th scope="col" className="px-4 py-5 font-medium">Author</th> */}
  //           <th scope="col" className="px-4 py-5 font-medium">
  //             Created At
  //           </th>
  //           <th scope="col" className="px-4 py-5 font-medium">
  //             Link
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {issues.map((issue: any, index: Number) => (
  //           <tr key={issue.id} className="py-10">
  //             <td className="py-10 text-center">{issue.title}</td>
  //             <td className="text-center">{issue.state}</td>
  //             {/* <td>{issue.user.login}</td> */}
  //             <td className="text-center">{formatDateToLocal(issue.created_at)}</td>
  //             <td className="text-center">
  //               <Link href={`/dashboard/${issue.user.login}/${issue.repository.name}/${issue.number}`} key={issue.id}>
  //                 <p>View</p>
  //               </Link>
  //               {/* { index === issues.length - 1 && (
                  
  //               )} */}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //     <div className="flex justify-center">
  //       { inView && nextPage && (
  //         <MagnifyingGlass
  //           visible={true}
  //           height="120"
  //           width="120"
  //           ariaLabel="magnifying-glass-loading"
  //           glassColor="white"
  //           color="black"
  //           />
  //           )}
  //       <span ref={ref} id="issue-end-tag" />
  //     </div>
  //   </>
  // )
}