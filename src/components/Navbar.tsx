"use client"

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { SignInButton } from "@/components/SignInButton"

const Navbar = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const cursorRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    gsap.set(cursorRef.current, { opacity: 0 })
  }, [])

  return (
    <nav className="bg-muted text-foreground py-5 shadow-md">
      <style>{`
        @keyframes border-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .rotating-border {
          animation: border-rotate 4s linear infinite;
          background: conic-gradient(
            from 0deg at 50% 50%,
            #ff0000 0%,
            #ff00ff 15%,
            #0000ff 35%,
            #00ffff 50%,
            #00ff00 65%,
            #ffff00 85%,
            #ff0000 100%
          );
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div className="relative rounded-full p-[2px] overflow-hidden group transition-all duration-300">
          <div
            className="rotating-border absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
          />
          <ul
            onMouseLeave={() => {
              gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 })
            }}
            className="relative flex w-fit rounded-full border-2 border-transparent group-hover:border-white bg-muted p-1"
          >
            <Tab setPosition={setPosition} href="/">
              Home
            </Tab>
            <Tab setPosition={setPosition} href="/about-us">
              About
            </Tab>
            <SignedIn>
              <Tab setPosition={setPosition} href="/dashboard">
                Dashboard
              </Tab>
            </SignedIn>
            <Cursor position={position} cursorRef={cursorRef} />
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
      <div className="sm:hidden mt-2">
        <Link href="/">Home</Link> &gt; <Link href="/team">Team</Link>
        <SignedIn>
          &gt; <Link href="/dashboard">Dashboard</Link>
        </SignedIn>
      </div>
    </nav>
  )
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: string
  setPosition: any
  href: string
}) => {
  const ref = useRef<HTMLLIElement>(null)

  const handleMouseEnter = () => {
    if (!ref?.current) return
    const { width } = ref.current.getBoundingClientRect()
    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    })
    gsap.to(ref.current, { color: "#000", duration: 0.1 })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { color: "#fff", duration: 0.3 })
  }

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 block cursor-pointer px-5 py-3 text-base font-medium uppercase text-white hover:text-muted transition-colors duration-300"
    >
      <Link href={href}>{children}</Link>
    </li>
  )
}

const Cursor = ({
  position,
  cursorRef,
}: {
  position: { left: number; width: number; opacity: number }
  cursorRef: any
}) => {
  useEffect(() => {
    gsap.to(cursorRef.current, {
      left: position.left,
      width: position.width,
      opacity: position.opacity,
      duration: 0.3,
    })
  }, [position, cursorRef])

  return (
    <li
      ref={cursorRef}
      style={{ pointerEvents: "none" }}
      className="absolute z-0 h-12 rounded-full bg-accent transition-all duration-300"
    />
  )
}

export default Navbar
