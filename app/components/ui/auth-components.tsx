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
      <button type="submit" className="text-gray-700 block px-4 py-2 text-sm d-block mr-0 ml-auto">Sign Out</button>
    </form>
  )
}