"use client"
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import authAction from "../../../lib/actions"
import { useFormStatus } from "react-dom";

export default function SignupCard() {
  
  return (
    <>
      <form className="space-y-4" action={authAction}>
        <SignUpButton />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account? </span>
        <Link
          className="text-blue-500 hover:underline text-[13px] mr-1"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </>
  );
}

function SignUpButton() {
    const {pending} = useFormStatus()

  return (
    <Button className="w-full flex gap-2" disabled={pending}>
      <Image src={"/logo-white.svg"} width={20} height={20} alt="Github logo" />{" "}
      Sign up with Github
    </Button>
  );
}
