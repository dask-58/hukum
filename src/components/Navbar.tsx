'use client'
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { Nav } from "react-day-picker"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="relative text-sm font-medium group"
      onClick={() => setIsOpen(false)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  )

  return (
    <nav className="sticky top-0 z-50 w-full glass-card backdrop-blur-md border-b border-white/10">
      <div className="px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-lg font-semibold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent hover:to-white/80 transition-all duration-300"
            >
              hukum
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-center space-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about-us">About</NavLink>
              <SignedIn>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </SignedIn>
              <SignedOut>
                <NavLink href="/pricing">Pricing</NavLink>
              </SignedOut>
            </div>
            <div className="flex items-center space-x-2 before:w-px before:h-6 before:bg-white/10 before:mr-2">
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-full border-2 border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                    }
                  }}
                />
              </SignedIn>
              <SignedOut>
                <Button
                  variant="secondary"
                  className="bg-white/5 hover:bg-white/10 border-0 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </SignedOut>
            </div>
          </div>

          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden hover:bg-white/5 transition-all duration-300"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="flex flex-col space-y-3 px-4 py-4">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about-us">About</NavLink>
              <SignedIn>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </SignedIn>
              <SignedOut>
                <NavLink href="/pricing">Pricing</NavLink>
              </SignedOut>
              <div className="pt-2 border-t border-white/10">
                <SignedIn>
                  <div className="flex items-center space-x-3">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm text-white/60">Account</span>
                  </div>
                </SignedIn>
                <SignedOut>
                  <Button
                    variant="secondary"
                    className="w-full bg-white/5 hover:bg-white/10 border-0 transition-all duration-300"
                    asChild
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
