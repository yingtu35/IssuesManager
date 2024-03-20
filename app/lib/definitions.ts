// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type IssuesSearchParams = {
  filter?: string;
  state?: string;
  since?: string;
  sort?: string;
  direction?: string;
  per_page?: string;
  page?: string;
  pulls: string;
};

export type IssueCardType = {
  user: string;
  title: string;
  repo: string;
  number: string;
  state: string;
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
}

export type CommentType = {
  user: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
  htmlUrl: string;
  // updatedAt: string;
}

export type IssueBodyType = CommentType;

export type UserIconType = {
  name: string;
  avatarUrl: string;
  htmlUrl: string;
}

export type ToolbarParams = {
  state: string;
  direction: string;
  sort: string;
}