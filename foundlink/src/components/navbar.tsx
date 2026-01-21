import Link from "next/link"
export const Navbar = () => {
    return( 
    <nav className="sticky top-0 z-50 bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="hover:text-blue-600">My E Commerce</Link>
        
            <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/addItem" className="hover:text-blue-600">Add Items</Link>
            <Link href="/viewItem" className="hover:text-blue-600">View Items</Link>
            <Link href="/logIn" className="hover:text-blue-600">Log In</Link>
            </div>
        </div>
    </nav>
    )
}