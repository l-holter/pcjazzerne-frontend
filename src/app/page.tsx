import Image from 'next/image'
import LoginForm from './components/LoginForm'
import { pb, getUser } from "@/app/lib/pocketbase";



export default function Home() {

  if (pb.authStore.isValid) {
    return (
      <main className="flex h-screen bg-blue-950 items-center justify-center">
      <Image
        src="/logo/pc_text.png"
        alt="PC Jazzerne Text Logo"
        width={400}
        height={200}
        className="w-half h-auto"
      />

      <button onClick={() => getUser()}>
      Get username
      </button>
    </main>
    )
  } else {
    return (
      <main className="flex h-screen bg-blue-950 items-center justify-center">
        <Image
          src="/logo/pc_text.png"
          alt="PC Jazzerne Text Logo"
          width={400}
          height={200}
          className="w-half h-auto"
        />
        <LoginForm />
      </main>
    )
  }
}
