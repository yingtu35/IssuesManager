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
};