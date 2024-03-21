"use client"

import { useState } from "react"
import Markdown from "react-markdown"
import { createIssue } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import { CancelCreate, SubmitButton, WriteButton, PreviewButton } from "./buttons";
export default function Form({ owner, repos }: { owner: string, repos: any[] }){
  const [edit, setEdit] = useState(true);
  const [bodyValue, setBodyValue] = useState("");
  const updateDisabled = bodyValue.length < 30;
  const initialState = { message: null, error: {} };
  const [state, dispatch] = useFormState(createIssue, initialState);

  function toggleEdit(value: boolean) {
    if (value !== edit) {
      setEdit(value);
    }
  }

  return (
    <form action={dispatch} className="w-full">
      <div className="flex flex-col gap-2">
        {/* Owner Name */}
        <div>
        <input type="hidden" id="owner" name="owner" value={owner} readOnly />
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
          <label htmlFor="repo" className="block font-bold">Choose a repository</label>
          <div className="relative">
            <select 
              id="repo" 
              name="repo"
              defaultValue=""
              className="border-2 border-gray-300 rounded-md p-2 w-full"
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
          <label htmlFor="title" className="block font-bold">Enter a title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            placeholder="Enter a title"
            defaultValue=""
            className="border-2 border-gray-300 rounded-md p-2 w-full" 
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
          <label htmlFor="body" className="block font-bold">Enter a description</label>
          <div className="flex flex-col border-2 border-gray-300 rounded-md">
            <div className="flex bg-gray-300">
              <WriteButton onClick={() => toggleEdit(true)} className={edit ? "z-10 border-2 border-gray-400 rounded-t-md bg-gray-400" : "hover:text-slate-600"} />
              <PreviewButton onClick={() => toggleEdit(false)} className={edit ? "hover:text-slate-600" : "z-10 border-2 border-gray-400 rounded-t-md bg-gray-400"} />
            </div>
            {edit ? (
              <div className="flex flex-col m-1">
                <textarea 
                  id="body" 
                  name="body"
                  placeholder="Add your description here..."
                  value={bodyValue}
                  onChange={(e) => setBodyValue(e.target.value)}
                  className="border-2 border-gray-300 rounded-md box-border p-2 w-full h-64 max-h-80"
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
            ) : (
              <>
                <input type="hidden" name="body" value={bodyValue} readOnly />
                <div className={`box-border p-2 w-full h-64 max-h-80 overflow-scroll`}>
                  <Markdown className="prose lg:prose-xl">{bodyValue}</Markdown>
                </div>
              </>
            )}
            <div id='form-error' aria-live='polite' aria-atomic='true'>
              {state.message && (
                <p className="p-2 text-sm text-red-500" key={state.message}>
                  {state.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <CancelCreate />
          <SubmitButton text="Create" disabled={updateDisabled} />
        </div>
      </div>
    </form>
  )
}