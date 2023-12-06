"use client"
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePBAuth } from "./contexts/AuthWrapper";


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
    <main className="flex h-screen bg-blue-950 items-center justify-center">
      {user ? (
        // Home page
        <div>
          <h1>{user.name}</h1>
          <p>
            <img src={user.avatarUrl} width={50} alt="avatar" />
          </p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : null}
    </main>
  );
};

export default Home;