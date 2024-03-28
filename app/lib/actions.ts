'use server'

import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IssuesSearchParams, FormState as State } from "./definitions";
import { getReposParams } from "./data";
import { baseUrl } from "./config";

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
    message: "Description must be at least 30 characters long",
  }),
});

const UpdateIssue = FormSchema.extend({
  issue_number: z.string({
    required_error: "Issue number is required",
    invalid_type_error: "Issue number must be a string",
  }),
});

export async function authenticate() {
  await signIn('github');
}

export async function logOut() {
  await signOut();
}

const getNextPageUrl = (res: Response) => {
  // get headers from response
  const headers = res.headers;
  // get the link header
  const link = headers.get('link');
  // extract the next page url from the link header
  const nextPageUrlArray = link && link.match(/<([^>]+)>;\s*rel="next"/);
  const nextPageUrl = nextPageUrlArray && nextPageUrlArray[1];
  return nextPageUrl;
}

const getToken = async () => {
  const session = await auth();
  if (!session?.access_token) {
    console.error('No access token found');
    return null;
  }
  return session.access_token;
}

const fetchData = async (url: string, method: string, token: string, body?: string) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    },
    body: body
  });
  return res;
}

export async function getIssues(searchParams: IssuesSearchParams) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }
  // add default values to searchParams if not provided
  searchParams = {
    ...searchParams,
    filter: searchParams.filter || 'repos',
    state: searchParams.state || 'all',
    sort: searchParams.sort || 'created',
    direction: searchParams.direction || 'desc',
    page: searchParams.page || "1",
    per_page: "10",
    pulls: "false"
  };
  
  // construct the query string from the searchParams object
  const query = new URLSearchParams(searchParams).toString();
  // construct the URL with the query string
  const url = `${baseUrl}/issues?${query}`;

  try {
    const res = await fetchData(url, 'GET', token);
    // if the response status is not ok, throw an error
    if (!res.ok) {
      throw new Error("Error fetching issues");
    }

    const nextPageUrl = getNextPageUrl(res);
      
    const data = await res.json();
    return [data, nextPageUrl];
  } catch (error) {
    console.error("Error fetching issues: ", error);
    throw new Error("Error fetching issues"); 
  }
}

export async function getMoreIssues(url: string) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }

  const res = await fetchData(url, 'GET', token);

  const nextPageUrl = getNextPageUrl(res);

  const data = await res.json();
  return [data, nextPageUrl];
}

export async function getIssue(owner: string, repo: string, number: string) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }
  const url = `${baseUrl}/repos/${owner}/${repo}/issues/${number}`;
  try {
    const res = await fetchData(url, 'GET', token);
    if (!res.ok) {
      throw new Error(`Error fetching issue ${repo}#${number}`);
    }
  
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching issue"); 
  }

}

export async function getRepos() {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }
  const { sort, direction } = getReposParams;
  const url = `${baseUrl}/user/repos?sort=${sort}&direction=${direction}`;

  try {
    const res = await fetchData(url, 'GET', token);
    if (!res.ok) { 
      throw new Error('Error fetching repos');
    }
    const data = await res.json();
    // extract only id and name field
    const repos = data.map((repo: any) => ({ id: repo.id, name: repo.name }));
    return repos;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching repos");
  }
}

export async function createIssue(prevState: State, formData: FormData) {
  const token = await getToken();
  if (!token) {
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
  const url = `${baseUrl}/repos/${owner}/${repo}/issues`;
  const bodyData = JSON.stringify({ owner, repo, title, body });
  const res = await fetchData(url, 'POST', token, bodyData);
  if (!res.ok) {
    return {
      message: "Error creating issue. Please try again later."
    }
  }
  const data = await res.json();
  const { number } = data;
  revalidatePath('/dashboard');
  redirect(`/dashboard/${owner}/${repo}/${number}`);
  return data;
}

export async function updateIssue(prevState: State, formData: FormData) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }
  const validationResult = UpdateIssue.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Missing fields or invalid input. Please check the form and try again."
    }
  }

  const { owner, repo, issue_number, title, body } = validationResult.data;
  const url = `${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}`;
  const bodyData = JSON.stringify({ owner, repo, title, body });
  const res = await fetchData(url, 'PATCH', token, bodyData);
  if (!res.ok) {
    return {
      message: "Error updating issue. Please try again later."
    }
  }
  const data = await res.json();
  revalidatePath(`/dashboard/${owner}/${repo}/${issue_number}`);
  redirect(`/dashboard/${owner}/${repo}/${issue_number}`);
  return data;
}

export async function closeIssue(owner: string, repo: string, issue_number: string) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }
  
  const url = `${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}`;
  const bodyData = JSON.stringify({ owner, repo, state: 'closed' });

  try {
    const res = await fetchData(url, 'PATCH', token, bodyData);
    if (!res.ok) {
      throw new Error('Error closing issue');
    }
    revalidatePath(`/dashboard/${owner}/${repo}/${issue_number}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error closing issue");
  }
}

export async function getIssueComments(owner: string, repo: string, issue_number: string) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }

  const searchParams = {
    per_page: "3",
    page: "1",
  };

  const query = new URLSearchParams(searchParams).toString();

  const url = `${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}/comments?${query}`;
  const res = await fetchData(url, 'GET', token);
  
  const data = await res.json();

  const nextPageUrl = getNextPageUrl(res);

  return [data, nextPageUrl];
}

export async function getMoreIssueComments(url: string) {
  const token = await getToken();
  if (!token) {
    console.error('No access token found');
    return [];
  }

  const res = await fetchData(url, 'GET', token);

  const nextPageUrl = getNextPageUrl(res);

  const data = await res.json();
  return [data, nextPageUrl];
}