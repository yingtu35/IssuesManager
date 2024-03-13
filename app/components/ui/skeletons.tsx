// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

const CardSkeleton = () => {
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

export const BreadcrumbSkeleton = () => {
  return (
    <div className="mb-6 block">
      <div className={`${shimmer} relative overflow-hidden flex`}>
        <div className="h-7 w-14 rounded-md bg-gray-200" />
        <span className="mx-3 inline-block">/</span>
        <div className="h-7 w-14 rounded-md bg-gray-200" />
      </div>
    </div>
  )
}

export const FormSkeleton = () => {
  return (
    <div className="w-[656px]">
      <div className={`${shimmer} relative overflow-hidden flex flex-col gap-2`}>
        <div className="h-6 w-64 rounded-md bg-gray-200" />
        <div className="h-10 w-full rounded-md bg-gray-200" />
        <div className="h-6 w-64 rounded-md bg-gray-200" />
        <div className="h-10 w-full rounded-md bg-gray-200" />
        <div className="h-6 w-64 rounded-md bg-gray-200" />
        <div className="h-[308px] w-76 rounded-md bg-gray-200" />
        <div className="flex justify-end gap-4">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
    </div>
  )
}

const ButtonSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden w-20 h-10 rounded-md bg-gray-200`} />
  )
}

export const UserSkeleton = () => {
  return (
    <>
      <div className={`${shimmer} relative overflow-hidden w-12 h-12 rounded-full bg-gray-200`} />
    </>
  )
}

const IssueInfoSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden flex flex-col gap-4`}>
      <div className="flex justify-between items-center">
        <div className="h-10 w-48 rounded-md bg-gray-200" />
        <div className="flex gap-4">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ButtonSkeleton />
        <div className="h-6 w-80 rounded-md bg-gray-200" />
      </div>
      <div className="border-t-2 border-gray-300"></div>
    </div>
  )
}

const CommentSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden flex flex-col gap-20 mt-4`}>
      <div className="flex gap-4 items-start">
        <UserSkeleton />
        <div className="w-[656px] h-24 rounded-md bg-gray-300">
          <div className="p-2">
            <div className="h-7 w-72 rounded-md bg-gray-200" />
          </div>
          <div className="p-2">
            <div className="h-7 w-96 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const CommentsSkeleton = () => {
  return (
    <div className="flex flex-col gap-20 mt-4">
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  )
}

export const IssueSkeleton = () => {
  return (
    <>
      <IssueInfoSkeleton />
      <CommentsSkeleton />
    </>
  )
}