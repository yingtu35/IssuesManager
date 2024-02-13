'use server'
import { auth, signIn, signOut } from "@/auth";
import { headers } from "next/headers";

const baseUrl = 'https://api.github.com';

export async function authenticate() {
  await signIn('github');
}

export async function logOut() {
  await signOut();
}

export async function getIssues() {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    return [];
  }

  const res = await fetch(`${baseUrl}/repos/yingtu35/nextjs-dashboard/issues`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = await res.json();
  // console.log(data);
  return data;
}