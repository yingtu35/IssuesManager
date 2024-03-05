// import { MainNav } from "./main-nav"
import { SignIn } from "./auth-components"
import { auth } from "@/auth"
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import UserIcon from "./ui/user/user-icon";

// TODO: Use NextUI for dropdown menu for user profile
export default async function Header() {
  const session = await auth();
  const user = session?.user;
  console.log("session.user: ", session?.user);
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        { user ? 
            <UserIcon user={user} /> : 
            <SignIn />
        }
      </div>
    </header>
  )
}
