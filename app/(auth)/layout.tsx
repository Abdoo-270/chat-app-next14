import Image from "next/image";
import Link from "next/link";
import React from "react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-auth-layout">
      <div className="p-8 bg-white rounded-lg shadow-md min-w-80">
        <Link href={"/"} className="flex justify-center mb-4">
          <Image src={"/logo-black.svg"} width={40} height={40} alt="logo" />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
