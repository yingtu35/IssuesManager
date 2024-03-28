"use client"

import { useState, useEffect } from "react";
import { getMoreIssueComments } from "@/app/lib/actions";

export default function useComments(
  inView: boolean,
  initialComments: any[],
  nextPageUrl: string | null
) {
  const [comments, setComments] = useState(initialComments);
  const [nextPage, setNextPage] = useState(nextPageUrl);

  useEffect(() => {
    setComments(initialComments);
    setNextPage(nextPageUrl); // Provide a default value of an empty string if nextPageUrl is null
  }, [initialComments, nextPageUrl]);

  // add a useEffect to fetch more comments when inView is true
  useEffect(() => {
    async function fetchMoreComments() {
      if (inView) {
        if (nextPage) {
          const [moreComments, nextUrl] = await getMoreIssueComments(nextPage);
          setComments([...comments, ...moreComments]);
          setNextPage(nextUrl);
        }
      }
    }
    fetchMoreComments();
  }, [inView]);

  return { comments, nextPage };
}
