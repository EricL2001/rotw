"use client"

import { useState } from "react"
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center relative px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-medium text-xl sm:text-2xl md:text-3xl">Records On The Wall</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center space-x-8 text-xl font-medium justify-end">
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/shows" className="transition-colors hover:text-primary">
            Shows
          </Link>
          <Link href="/store" className="transition-colors hover:text-primary">
            Store
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden fixed right-4 top-4 z-[70] w-6 h-6 flex flex-col justify-center items-center`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <span
            className={`block absolute h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`block absolute h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block absolute h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-16 right-4 w-56 bg-black/95 border border-orange-500/70 rounded-md shadow-lg">
            <nav className="flex flex-col py-2">
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-white hover:bg-yellow-400/10"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/shows"
                className="px-4 py-2 text-sm font-medium text-white hover:bg-yellow-400/10"
                onClick={() => setIsOpen(false)}
              >
                Shows
              </Link>
              <Link
                href="/store"
                className="px-4 py-2 text-sm font-medium text-white hover:bg-yellow-400/10"
                onClick={() => setIsOpen(false)}
              >
                Store
              </Link>
              <hr className="mt-4 mb-4 border-orange-500/70" />
              <div className="flex justify-evenly items-center mb-4">
                <Link href="https://facebook.com/reconthewall" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="w-6 h-6 text-white hover:text-orange-400 transition-colors" />
                </Link>
                <Link href="https://instagram.com/recsonthewall" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="w-6 h-6 text-white hover:text-orange-400 transition-colors" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}