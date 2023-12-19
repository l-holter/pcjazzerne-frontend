'use client'
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePBAuth } from "../contexts/AuthWrapper";
import MatchCountdown from "../components/MatchCountdown";

const Home: NextPage = () => {
  const { user } = usePBAuth();

  return (
    <>
    {user ? (
        <MatchCountdown />
    ) : null}
    </>
  );
};

export default Home;