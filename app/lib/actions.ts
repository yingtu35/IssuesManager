'use server'

import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";

const baseUrl = 'https://api.github.com';

const FormSchema = z.object({
  owner: z.string({
    required_error: "Owner is required",
    invalid_type_error: "Owner must be a string",
  }),
  repo: z.string({
    required_error: "Repo is required",
    invalid_type_error: "Repo must be a string",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  body: z.string().min(30, {
    message: "Body must be at least 30 characters long",
  }),
});

const UpdateSchema = FormSchema.extend({
  issue_number: z.string({
    required_error: "Issue number is required",
    invalid_type_error: "Issue number must be a string",
  }),
});

export type State = {
  errors?: {
    owner?: string[];
    repo?: string[];
    title?: string[];
    body?: string[];
  };
  message?: string | null;
}

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
    console.error('No access token found');
    return [];
  }

  const res = await fetch(`${baseUrl}/issues?filter=all&state=open`, {
    method: 'GET',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = await res.json();
  // console.log(data);
  return data;
}

export async function getIssue(owner: string, repo: string, number: string) {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }

  const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues/${number}`, {
    method: 'GET',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = await res.json();
  console.log("getIssue: ", data);
  return data;
}

export async function getRepos() {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }

  const sort = 'updated';
  const direction = 'desc';

  const res = await fetch(`${baseUrl}/user/repos?sort=${sort}&direction=${direction}`, {
    method: 'GET',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = await res.json();
  // extract only id and name field
  const repos = data.map((repo: any) => ({ id: repo.id, name: repo.name }));
  // console.log("getRepos: ", repos);
  return repos;
}

export async function createIssue(prevState: State, formData: FormData) {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }
  
  const validationResult = FormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing fields or invalid input. Please check the form and try again."
    }
  }

  const { owner, repo, title, body } = validationResult.data;
  const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({
      owner, repo, title, body
    })
  });
  const data = await res.json();
  console.log("createIssue: ", data);
  return data;
}

export async function updateIssue(prevState: State, formData: FormData) {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }
  
  const validationResult = UpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing fields or invalid input. Please check the form and try again."
    }
  }

  const { owner, repo, issue_number, title, body } = validationResult.data;
  const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}`, {
    method: 'PATCH',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({
      owner, repo, title, body
    })
  });
  const data = await res.json();
  console.log("updateIssue: ", data);
  return data;
}