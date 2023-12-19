"use client"

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { usePBAuth } from "../contexts/AuthWrapper";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { user, isAuthorized } = usePBAuth();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (!user && isAuthorized) {
        router.push('/login');
      }
    };

    checkUser();
  }, [user, router, isAuthorized]);

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="mx-auto pt-40">{children}</div>
    </div>
  );
};

export default HomeLayout;
