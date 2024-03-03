"use client"

import { updateIssue } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import { CancelEdit, SubmitButton } from "./buttons"
export default function Form({
  params, 
  issue 
}: { 
  params: {
    owner: string,
    repo: string,
    id: string
  },
  issue: any 
}){
  const { owner, repo, id } = params;
  const { title, body } = issue;
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(updateIssue, initialState);
  // a form to create a new issue
  // contains fields for owner, repo, title, body
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
            value={repo}
            disabled
          >
            <option key={repo} value={repo}>
              {repo}
            </option>
          </select>
          <input type="hidden" name="repo" value={repo} />
          <input type="hidden" name="issue_number" value={id} />
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
          defaultValue={title} 
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
          defaultValue={body}
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
        <CancelEdit owner={owner} repo={repo} id={id} />
        <SubmitButton text="Update" />
      </div>
    </form>
  )
}