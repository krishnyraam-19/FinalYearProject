import Link from "next/link"
export const Navbar = () => {
    return( 
    <nav>
        <div>
            <Link href="/">My E Commerce</Link>
        </div>
        <div>
            <Link href="/">Home</Link>
            <Link href="/addItem">Add Items</Link>
            <Link href="/viewItem">View Items</Link>
            <Link href="/logIn">Log In</Link>
        </div>
    </nav>
    )
}