// import { MainNav } from "./main-nav"
import { SignIn, SignOut } from "./auth-components"
import { auth } from "@/auth"
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

// TODO: Use NextUI for dropdown menu for user profile
export default async function Header() {
  const session = await auth();
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
        { session?.user ? (
          <div className="flex items-center">
            <Image
              src={session?.user?.image ?? ""}
              alt="user avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
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
