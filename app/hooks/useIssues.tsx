"use client"

import { useState, useEffect } from "react";
import { getMoreIssues } from "@/app/lib/actions";

export default function useIssues(
  inView: boolean,
  initialIssues: any[],
  nextPageUrl: string | null
) {
  const [issues, setIssues] = useState(initialIssues);
  const [nextPage, setNextPage] = useState(nextPageUrl);

  useEffect(() => {
    setIssues(initialIssues);
    setNextPage(nextPageUrl); // Provide a default value of an empty string if nextPageUrl is null
  }, [initialIssues, nextPageUrl]);

  // add a useEffect to fetch more issues when inView is true
  useEffect(() => {
    async function fetchMoreIssues() {
      if (inView) {
        if (nextPage) {
          const [moreIssues, nextUrl] = await getMoreIssues(nextPage);
          setIssues([...issues, ...moreIssues]);
          setNextPage(nextUrl);
        }
      }
    }
    fetchMoreIssues();
  }, [inView]);

  return { issues, nextPage };
}
