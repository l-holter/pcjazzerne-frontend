'use client'
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePBAuth } from "../contexts/AuthWrapper";
import MatchCountdown from "../components/MatchCountdown";

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
        <MatchCountdown />
    ) : null}
    </>
  );
};

export default Home;