export default function SignUpForm(){
    return(
        <form className="space-x-4">
            <div>
                <label htmlFor="fname" className="block text-la font-medium text-gray-700">First Name:</label>
                <input className="mt-5 block w-full rounded-md border-gray-300 shadow-sm font-medium text-blue-700" type="text" name="fname" id="fname" placeholder="Enter your First Name" required/>
            </div>
            <div>
                <label htmlFor="lname" className="block text-la font-medium text-gray-700">Last Name:</label>
                <input className="mt-5 block w-full rounded-md border-gray-300 shadow-sm font-medium text-blue-700" type="text" name="lname" id="lname" placeholder="Enter your Last Name"/>
            </div>
            <div>
                <label htmlFor="phone" className="block text-la font-medium text-gray-700">Phone Number:</label>
                <input className="mt-5 block w-full rounded-md border-gray-300 shadow-sm font-medium text-blue-700" type="phone" name="phone" id="phone" placeholder="Enter your Phone Number" required/>
            </div>
            <div>
                <label htmlFor="password" className="mt-2 block text-la font-medium text-gray-700">Password:</label>
                <input className="mt-5 block w-full rounded-md border-gray-300 shadow-sm font-medium text-blue-700" type="password" name="password" id="password" placeholder="Enter your password"/>
            </div>
            <button type="submit" className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">Sign Up</button>
        </form>
    )
}