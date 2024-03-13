import { BreadcrumbSkeleton, IssueSkeleton } from "@/app/components/ui/skeletons";

export default function Loading() {
  return (
    <main>
      <BreadcrumbSkeleton />
      <IssueSkeleton />
    </main>
  )
}