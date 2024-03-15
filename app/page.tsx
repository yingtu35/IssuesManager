import Image from "next/image";

// TODO: show loading spinner when clicking the button
// TODO: develop mobile version
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-6">
      <div>
        <h1 className="text-4xl font-bold text-center">Welcome to Issue manager!</h1>
        <p className="text-center">
          A simple issue manager for your GitHub repositories
        </p>
      </div>
      <Image
          src="/doing-desktop3.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the project showing desktop version"
        />
      <Image
          src="/doing-mobile.png"
          width={1000}
          height={500}
          className="block md:hidden"
          alt="Screenshots of the project showing desktop version"
        />
    </main>
  );
}
