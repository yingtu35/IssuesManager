"use client"

// import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useIssues from "@/app/hooks/useIssues"
import { formatDateToLocal } from "@/app/lib/utils";
// import { getMoreIssues } from "@/app/lib/actions";
import Card from "./card";
import { CardsSkeleton } from "../skeletons";

export default function FilteredIssuesTable({
  initialIssues, 
  nextPageUrl
}: {
  initialIssues: any[],
  nextPageUrl: string | null
}) {
  const { ref, inView, entry } = useInView();
  const { issues, nextPage } = useIssues(inView, initialIssues, nextPageUrl);

  return (
      <div className="flex flex-col gap-4">
        {issues.map((issue: any, index: Number) => {
          const user = issue.user.login;
          const repo = issue.repository.name;
          const { title, number, state, created_at, updated_at} = issue;
          const formattedCreatedAt = formatDateToLocal(created_at);
          const formattedUpdatedAt = formatDateToLocal(updated_at);
          const issueCard = { user, title, repo, number, state, formattedCreatedAt, formattedUpdatedAt };
          return (
            <Card issueCard={issueCard} key={issue.id} />
          )
        })}
        <div>
        <span ref={ref} id="issue-end-tag" />
          { inView && nextPage && (
            <div className="flex flex-col gap-4">
              <CardsSkeleton />
            </div>
            )
          }
        </div>
      </div>
  )
}