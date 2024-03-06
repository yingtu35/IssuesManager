// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const CardSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-300 p-2 shadow-sm`}>
        <div className="flex justify-between items-start p-2">
          <div className="flex flex-col gap-2">
            {/* <p className="text-4xl"><strong>{title}</strong></p> */}
            <div className="h-10 w-64 rounded-md bg-gray-200" />
            <div className="h-6 w-32 rounded-md bg-gray-200" />
          </div>
            <div className="h-10 w-20 rounded-md bg-gray-200" />
        </div>
        <div className="mt-2 flex justify-start gap-4 p-2">
          <div className="h-5 w-80 rounded-md bg-gray-200" />
        </div>
      </div>
  )
}

export const CardsSkeleton = () => {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export const IssuesSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <CardsSkeleton />
      <CardsSkeleton />
      <CardsSkeleton />
      <CardSkeleton />
    </div>
  )
}