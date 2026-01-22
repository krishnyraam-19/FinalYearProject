export default function SignInForm(){
    return(
        <form className="space-x-4">
            <div>
                <label htmlFor="email" className="block text-la font-medium text-gray-700">Email:</label>
                <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm font-medium text-blue-700" type="email" name="email" id="email" placeholder="Enter your email"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-la font-medium text-gray-700">Email:</label>
                <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm font-medium text-blue-700" type="email" name="email" id="email" placeholder="Enter your email"/>
            </div>
        </form>
    )
}