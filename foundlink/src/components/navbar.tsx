"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export const Navbar = () => {
    const {data:session} = useSession();

    return( 
    <nav className="sticky top-0 z-50 bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="hover:text-blue-600">Found Link LK</Link>
        
            <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            {session?.user?.role === "user" && (
                <>
            <Link href="/addItem" className="hover:text-blue-600">
              Add Lost Items
            </Link>
            <Link href="/viewItem" className="hover:text-blue-600">
                View my Item
            </Link>
            </>
            
          )}

          {/* Volunteer only */}
          {session?.user?.role === "volunteer" && (
            <>
            <Link href="/viewMyFoundItem" className="hover:text-blue-600">
              View Found items
            </Link>
            <Link href="/addFoundItem" className="hover:text-blue-600">
              Add Found Item
            </Link>
            </>
          )}

          {/* Admin only */}
          {session?.user?.role === "admin" && (
            <Link href="/adminView" className="hover:text-blue-600">
              View Items
            </Link>
          )}

          {!session ? (
            <Link href="/logIn" className="hover:text-blue-600">
              Log In
            </Link>
          ) : (
            <>
              <p>{session.user?.name}</p>
              <button
                onClick={() => signOut({ callbackUrl: "/logIn" })}
                className="cursor-pointer text-white bg-blue-600 px-4 py-2 rounded-full"
              >
                Log Out
              </button>
            </>
            )
            }           
            
            </div>
        </div>
    </nav>
    )
}