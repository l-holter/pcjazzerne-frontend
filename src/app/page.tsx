import Image from 'next/image'
import LoginForm from './components/LoginForm'


export default function Home() {

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
