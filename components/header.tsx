// import { MainNav } from "./main-nav"
import { Button } from "./ui/button"
import { SignIn, SignOut } from "./auth-components"
import { auth } from "@/auth"

export default async function Header() {
  const session = await auth();
  // console.log(session);
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        { session?.user ? (
          <div className="flex">
            <p>{session.user.name}</p>
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </header>
  )
}
