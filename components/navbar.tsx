"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center relative px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">Records On The Wall</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-md font-medium justify-end">
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/shows" className="transition-colors hover:text-primary">
            Shows
          </Link>
          <Link href="/tickets" className="transition-colors hover:text-primary">
            Tickets
          </Link>
          <Link href="/store" className="transition-colors hover:text-primary">
            Store
          </Link>
        </nav>
        <button
          className={`md:hidden fixed right-4 top-4 z-[70] w-6 h-6 flex flex-col justify-center items-center ${
            isOpen ? "text-white" : "text-current"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span
            className={`block absolute h-0.5 w-5 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`block absolute h-0.5 w-5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block absolute h-0.5 w-5 bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Mobile slide-out navigation */}
      <div
        className={`fixed inset-y-0 right-0 z-60 w-full max-w-[200px] bg-black text-white shadow-lg transform ease-in-out transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col text-md font-medium p-4 mt-14">
          <Link
            href="/about"
            className="py-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/shows"
            className="py-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Shows
          </Link>
          <Link
            href="/tickets"
            className="py-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Tickets
          </Link>
          <Link
            href="/store"
            className="py-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Store
          </Link>
        </nav>
      </div>
    </header>
  )
}

