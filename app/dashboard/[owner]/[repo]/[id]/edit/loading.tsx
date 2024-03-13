import { BreadcrumbSkeleton, UserSkeleton, FormSkeleton } from '@/app/components/ui/skeletons';

export default function Loading() {
  return (
    <main>
      <BreadcrumbSkeleton />
      <div className="flex gap-4 items-start">
        <UserSkeleton />
        <FormSkeleton />
      </div>
    </main>
  )
}