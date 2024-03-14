'use server'

import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IssuesSearchParams } from "./definitions";

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
    message: "Description must be at least 30 characters long",
  }),
});

const UpdateIssue = FormSchema.extend({
  issue_number: z.string({
    required_error: "Issue number is required",
    invalid_type_error: "Issue number must be a string",
  }),
});

const CloseIssue = UpdateIssue.omit({title: true, body: true});

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

export async function getIssues(searchParams: IssuesSearchParams) {
  const session = await auth();
  // console.log(session);
  if (!session?.access_token) {
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
    // if since is not provided in searchParams, use the oldest date possible
    // since: searchParams.since || "1970-01-01T00:00:00Z",
    page: searchParams.page || "1",
    per_page: "10",
    pulls: "false"
  };
  
  // console.log("searchParams:", searchParams);

  // construct the query string from the searchParams object
  const query = new URLSearchParams(searchParams).toString();
  // console.log("query:", query);
  // construct the URL with the query string
  const url = `${baseUrl}/issues?${query}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${session.access_token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    // if the response status is not ok, throw an error
    if (!res.ok) {
      throw new Error("Error fetching issues");
    }

    // get headers from response
    const headers = res.headers;
    // get the link header
    const link = headers.get('link');
    const pagesRemaining = link && link.includes(`rel=\"next\"`);
    // extract the next page url from the link header
    const nextPageUrlArray = link && link.match(/<([^>]+)>;\s*rel="next"/);
    console.log("nextPageUrlArray:", nextPageUrlArray);
    const nextPageUrl = nextPageUrlArray && nextPageUrlArray[1];
  
    if (pagesRemaining) {
      console.log('There are more pages of issues');
    }
    
    const data = await res.json();
    console.log("getIssues: ", data);
    // if data 
    return [data, nextPageUrl];
  } catch (error) {
    console.error("Error fetching issues: ", error);
    throw new Error("Error fetching issues"); 
  }
}

export async function getMoreIssues(url: string) {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });

  // get headers from response
  const headers = res.headers;
  // get the link header
  const link = headers.get('link');
  const pagesRemaining = link && link.includes(`rel=\"next\"`);
  // extract the next page url from the link header
  const nextPageUrlArray = link && link.match(/<([^>]+)>;\s*rel="next"/);
  console.log("nextPageUrlArray:", nextPageUrlArray);
  const nextPageUrl = nextPageUrlArray && nextPageUrlArray[1];

  const data = await res.json();
  // console.log(data);
  return [data, nextPageUrl];
}

export async function getIssue(owner: string, repo: string, number: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const session = await auth();
  // console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }
  try {
    const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues/${number}`, {
      method: 'GET',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${session.access_token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (!res.ok) {
      console.log(res.ok);
      console.error(`Error fetching issue ${repo}#${number}`);
      throw new Error(`Error fetching issue ${repo}#${number}`);
    }
  
    const data = await res.json();
    console.log("getIssue: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching issue: ", error);
    throw new Error("Error fetching issue"); 
  }

}

export async function getRepos() {
  const session = await auth();
  // console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }

  const sort = 'updated';
  const direction = 'desc';

  try {
    const res = await fetch(`${baseUrl}/user/repos?sort=${sort}&direction=${direction}`, {
      method: 'GET',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${session.access_token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (!res.ok) { 
      console.error('Error fetching repos');
      throw new Error('Error fetching repos');
    }
    const data = await res.json();
    // extract only id and name field
    const repos = data.map((repo: any) => ({ id: repo.id, name: repo.name }));
    // console.log("getRepos: ", repos);
    return repos;
  } catch (error) {
    console.error("Error fetching repos: ", error);
    throw new Error("Error fetching repos");
  }
}

export async function createIssue(prevState: State, formData: FormData) {
  const session = await auth();
  // console.log(session);
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
  if (!res.ok) {
    return {
      message: "Error creating issue. Please try again later."
    }
  }
  const data = await res.json();
  console.log("createIssue: ", data);
  const { number } = data;
  revalidatePath('/dashboard');
  redirect(`/dashboard/${owner}/${repo}/${number}`);
  return data;
}

export async function updateIssue(prevState: State, formData: FormData) {
  const session = await auth();
  // console.log(session);
  if (!session?.access_token) {
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
  
  const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}`, {
    method: 'PATCH',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      // Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({
      owner, repo, title, body
    })
  });
  if (!res.ok) {
    return {
      message: "Error updating issue. Please try again later."
    }
  }
  const data = await res.json();
  console.log("updateIssue: ", data);
  revalidatePath(`/dashboard/${owner}/${repo}/${issue_number}`);
  redirect(`/dashboard/${owner}/${repo}/${issue_number}`);
  return data;
}

export async function closeIssue(owner: string, repo: string, issue_number: string) {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }
  
  const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}`, {
    method: 'PATCH',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    },
    body: JSON.stringify({
      owner, repo, state: 'closed'
    })
  });
  const data = await res.json();
  console.log("closeIssue: ", data);
  revalidatePath(`/dashboard/${owner}/${repo}/${issue_number}`);
}

export async function getIssueComments(owner: string, repo: string, issue_number: string) {
  const session = await auth();
  console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }

  const searchParams = {
    per_page: "3",
    page: "1",
  };

  const query = new URLSearchParams(searchParams).toString();

  const res = await fetch(`${baseUrl}/repos/${owner}/${repo}/issues/${issue_number}/comments?${query}`, {
    method: 'GET',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = await res.json();
  console.log("getIssueComments: ", data);

  // get headers from response
  const headers = res.headers;
  // get the link header
  const link = headers.get('link');
  const pagesRemaining = link && link.includes(`rel=\"next\"`);
  // extract the next page url from the link header
  const nextPageUrlArray = link && link.match(/<([^>]+)>;\s*rel="next"/);
  console.log("nextPageUrlArray:", nextPageUrlArray);
  const nextPageUrl = nextPageUrlArray && nextPageUrlArray[1];

  if (pagesRemaining) {
    console.log('There are more pages of comments');
  }
  return [data, nextPageUrl];
}

export async function getMoreIssueComments(url: string) {
  const session = await auth();
  // console.log(session);
  if (!session?.access_token) {
    console.error('No access token found');
    return [];
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer ${session.access_token}`,
      Accept: 'application/vnd.github+json'
    }
  });

  // get headers from response
  const headers = res.headers;
  // get the link header
  const link = headers.get('link');
  // const pagesRemaining = link && link.includes(`rel=\"next\"`);
  // extract the next page url from the link header
  const nextPageUrlArray = link && link.match(/<([^>]+)>;\s*rel="next"/);
  console.log("nextPageUrlArray:", nextPageUrlArray);
  const nextPageUrl = nextPageUrlArray && nextPageUrlArray[1];

  const data = await res.json();
  // console.log(data);
  return [data, nextPageUrl];
}