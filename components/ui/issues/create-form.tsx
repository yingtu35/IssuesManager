"use client"

import Link from "next/link"
import { createIssue } from "@/app/lib/actions"
import { useFormState } from "react-dom"
export default function Form({ owner, repos }: { owner: string, repos: any[] }){
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(createIssue, initialState);

  return (
    <form action={dispatch}>
      {/* Owner Name */}
      <div>
        <label htmlFor="owner" className="block">Owner</label>
        <input type="text" id="owner" name="owner" value={owner} readOnly />
        <div id="owner-error" aria-live="polite" aria-atomic="true">
            {state.errors?.owner &&
              state.errors.owner.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
      {/* Repo Name */}
      <div>
        <label htmlFor="repo" className="block">Choose a repo</label>
        <div className="relative">
          <select 
            id="repo" 
            name="repo"
            defaultValue=""
          >
            {repos.map((repo: any) => (
              <option key={repo.id} value={repo.name}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
        <div id="repo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.repo &&
              state.errors.repo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
      {/* Issue Title */}
      <div>
        <label htmlFor="title" className="block">Title</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          placeholder="Enter a title"
          defaultValue="" 
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
      {/* Issue Body */}
      <div>
        <label htmlFor="body" className="block">Body</label>
        <textarea 
          id="body" 
          name="body"
          placeholder="Enter a description"
        />
        <div id="body-error" aria-live="polite" aria-atomic="true">
            {state.errors?.body &&
              state.errors.body.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
            href="/dashboard"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        <button type="submit">Create Issue</button>
      </div>
    </form>
  )
}