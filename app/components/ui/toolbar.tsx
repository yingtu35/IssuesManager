'use client'

import { ToolbarParams } from "@/app/lib/definitions";
import { defaultParams } from "@/app/lib/data";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import Filtering from "@/app/components/ui/queries/filtering";
import Direction from "@/app/components/ui/queries/direction";
import Sorting from "@/app/components/ui/queries/sorting";
import ResetToolbar from "./reset-toolbar";
import { CreateIssue } from "@/app/components/ui/issues/buttons";

export default function Toolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [state, setState] = useState<ToolbarParams['state']>(searchParams.get('state') as ToolbarParams['state'] || defaultParams.state);
  const [direction, setDirection] = useState<ToolbarParams['direction']>(searchParams.get('direction') as ToolbarParams['direction'] || defaultParams.direction);
  const [sort, setSort] = useState<ToolbarParams['sort']>(searchParams.get('sort') as ToolbarParams['sort'] || defaultParams.sort);

  function handleParameterChange(type: string, value: string) {
    switch (type) {
      case 'state':
        setState(value as ToolbarParams['state']);
        break;
      case 'direction':
        setDirection(value as ToolbarParams['direction']);
        break;
      case 'sort':
        setSort(value as ToolbarParams['sort']);
        break;
    }
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    replace(`${pathname}?${params.toString()}`)
  }

  function resetParams() {
    setState(defaultParams.state);
    setDirection(defaultParams.direction);
    setSort(defaultParams.sort);
  }

  function handleReset() {
    resetParams();
    const params = new URLSearchParams(searchParams);
    // delete all params
    params.forEach((_, key) => {
      params.delete(key);
    })
    replace(`${pathname}`);
  }

  return (
    <>
      <div className="hidden md:flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Filtering state={state} onStateChange={handleParameterChange} />
          <Direction direction={direction} onDirectionChange={handleParameterChange} />
          <Sorting sort={sort} onSortChange={handleParameterChange} />
        </div>
        {/* <DateSince initialSince={since} /> */}
        <div className="flex items-center gap-2">
          <ResetToolbar handleReset={handleReset} />
          <CreateIssue />
        </div>
      </div>
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center gap-2">
          <Filtering state={state} onStateChange={handleParameterChange} />
          <Direction direction={direction} onDirectionChange={handleParameterChange} />
          <Sorting sort={sort} onSortChange={handleParameterChange} />
        </div>
        {/* <DateSince initialSince={since} /> */}
        <div className="flex items-center justify-center gap-2">
          <ResetToolbar handleReset={handleReset} />
          <CreateIssue />
        </div>
      </div>
    </>
  )
}