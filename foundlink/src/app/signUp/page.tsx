import SignUpForm from "@/components/signUp";

import Link from "next/link";

export default function SignUpPage(){
    return(
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="mt-4 text-center">SIGN UP</p>
          <SignUpForm/>
          <p className="mt-4 text-center">Don't have an account ? <Link className="text-blue-600 hover:underline" href="/signUp">Register</Link></p>
        </div>
    )
}