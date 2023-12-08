import React from "react";
import Navbar from "../components/Navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-100">
      <Navbar />
      <div className="mx-auto pt-40">{children}</div>
    </div>
  );
};

export default HomeLayout;
