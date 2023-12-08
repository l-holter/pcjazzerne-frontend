'use client'
import Image from "next/image"
import Link from "next/link";
import { usePBAuth } from "../contexts/AuthWrapper";

export default function Navbar() {
  const { user, signOut } = usePBAuth();

  const handleSignOutButtonClick = () => {
    signOut()
  }

  return (
    <nav className="bg-pcjazzerne-midnight p-5 w-full h-40 fixed top-0 z-50 shadow-lg">
      <div className="bg-pcjazzerne-midnight h-full w-full flex items-center justify-between">

        <div className="h-full w-1/3 flex flex-grow-0 pl-10 items-center justify-start">
          <Link className="mr-20 text-2xl hover:text-pcjazzerne-gold transition-colors hover:underline" href="/">Home</Link>
          <Link className="mr-20 text-2xl hover:text-pcjazzerne-gold transition-colors hover:underline" href="/">Stats</Link>
          <Link className="mr-20 text-2xl hover:text-pcjazzerne-gold transition-colors hover:underline" href="/">Kryss</Link>
          <Link className="text-2xl hover:text-pcjazzerne-gold transition-colors hover:underline" href="/players">Spillere</Link>
        </div>

        <div className="h-full w-1/3 flex flex-grow-0 items-center justify-center">
          <Image
            src="/logo/pc_text.png"
            alt="PC Jazzerne Text Logo"
            width={270}
            height={270}
            className="w-half h-auto mb-10"
          />
        </div>

        <div className=" h-full w-1/3 flex flex-grow-0 items-center justify-end">
          <p className="mr-5">Velkommen, {user?.name}! <button onClick={handleSignOutButtonClick} className="hover:text-pcjazzerne-gold transition-colors hover:underline"> Sign out?</button></p>
          <Image
            src={user?.avatarUrl ?? "/logo/pc_logo.png"}
            alt="Profilbilde"
            width={50}
            height={50}
            className="w-half h-auto rounded-full"
          />
        </div>

      
        
     </div>
    </nav>
  );
}