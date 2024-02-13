import { Button } from "./ui/button";
import { authenticate, logOut } from "@/app/lib/actions";

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

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={logOut}>
      <Button {...props}>Sign Out</Button>
    </form>
  )
}