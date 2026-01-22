import SignInForm from "@/components/signIn";


export default function LogInPage(){
    return(
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="mt-4 text-center">SIGN IN</p>
          <SignInForm/>
          <p className="mt-4 text-center">Don't have an account ? Register</p>
        </div>
    )
}