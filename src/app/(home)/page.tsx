'use client'
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePBAuth } from "../contexts/AuthWrapper";

const Home: NextPage = () => {
  const { user, signOut, isInitialized } = usePBAuth(); // Add isInitialized to usePBAuth
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      // Wait for authentication initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect to login page if user is not defined and authentication is initialized
      if (!user && isInitialized) {
        router.push('/login');
      }
    };

    checkUser();
  }, [user, router, isInitialized]);
  

  return (
    <>
    {user ? (
      <main className="flex h-screen w-screen bg-white items-center justify-center">
        <div>
          <h1>{user.name}</h1>
          <p>
          </p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
    </main>
    ) : null}
    </>
  );
};

export default Home;