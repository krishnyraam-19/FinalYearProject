import MyContactRequests from "@/components/requestedItems";
import SignInForm from "@/components/requestedItems";
import Link from "next/link";


export default function ContactRequestPage(){
    return(
        <div>
          {/* <p className="mt-4 text-center">SIGN IN</p> */}
          <MyContactRequests/>
          {/* <p className="mt-4 text-center">Don't have an account ? <Link className="text-blue-600 hover:underline" href="/signUp">Register</Link></p> */}
        </div>
    )
}