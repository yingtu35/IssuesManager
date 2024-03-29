import { SignIn } from "./auth-components"
import { auth } from "@/auth"
import Logo from "./logo";
import ProfileIcon from "./user/user-icon";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-4xl px-4 mx-auto sm:px-6">
        <Logo />
        { user ? 
            <ProfileIcon user={user} /> : 
            <SignIn />
        }
      </div>
    </header>
  )
}
