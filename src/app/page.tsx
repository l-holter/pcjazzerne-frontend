import Image from 'next/image'

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
    </main>
  )
}
