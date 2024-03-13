import { Button } from "./button";
import { authenticate, logOut } from "@/app/lib/actions";
import Link from "next/link";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={authenticate}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut() {
  return (
    <form action={logOut}>
      <button type="submit" className="text-gray-700 block px-4 py-2 text-sm d-block mr-0 ml-auto transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">Sign Out</button>
    </form>
  )
}