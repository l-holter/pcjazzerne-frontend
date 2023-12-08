import Navbar from "../components/Navbar"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="bg-white w-full h-full mt-40">
      <Navbar />
      {children}
    </div>
  )
};
