"use client"
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePBAuth } from "./contexts/AuthWrapper";
import Navbar from "./components/Navbar";

const Home: NextPage = () => {
  const { user, signOut} = usePBAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if user is not defined
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <>
    {user ? (
      <main className="flex h-screen w-screen bg-white items-center justify-center">
        <Navbar />
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