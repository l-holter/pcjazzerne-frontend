"use client"
import Image from 'next/image'
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { usePBAuth } from "../contexts/AuthWrapper";



const Login: NextPage = () => {
  const { googleSignIn } = usePBAuth();
  const router = useRouter();

  const handleSignInButtonClick = async () => {
    try {
      const userData = await googleSignIn();
      console.log('User signed in:', userData);
      router.push("/")
      // Redirect or perform other actions after successful sign-in
    } catch (error) {
      console.error('Sign-in failed:', error);

      // Handle error, display a message, etc.
    }
  };

  return (
    <main className="flex h-screen bg-blue-950 items-center justify-center">
      <div className="w-90 h-full">
        <Image
          src="/logo/pc_text.png"
          alt="PC Jazzerne Text Logo"
          width={400}
          height={200}
          className="w-half h-auto"
        />
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 h-50">
          <Image
            src="/logo/pc_logo.png"
            alt="PC Jazzerne Text Logo"
            width={70}
            height={70}
            className="w-half h-auto mb-8 mt-2"
          />
          <h1 className="font-bold text-2xl text-black mb-5">Du må logge inn for å fortsette</h1>

          <div className="flex items-center justify-center dark:bg-gray-800">
            <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"  onClick={handleSignInButtonClick}>
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google Logo"
                  className="w-6 h-6"
                />
                <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </main> 
  )
};

export default Login;