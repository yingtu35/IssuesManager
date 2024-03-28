import { ToolbarParams, GetReposParams } from "@/app/lib/definitions";

export const defaultParams: ToolbarParams = {
  state: 'Filter by',
  direction: 'Order by',
  sort: 'Sort by'
}

export const getReposParams: GetReposParams = {
  sort: 'updated',
  direction: 'desc'
}