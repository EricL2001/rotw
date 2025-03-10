import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";


export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Records On The Wall</h2>
          <p className="text-sm text-muted-foreground mt-8">BOOKING • PROMO • TICKETING<br />
            Built with ❤️ in Charlotte, NC</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect With Us</h3>
            <ul className="space-y-5 text-sm">
              <li>
                <Link href="/shows" className="text-muted-foreground transition-colors hover:text-primary">
                  <FaInstagram size={24} />
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-muted-foreground transition-colors hover:text-primary">
                  <FaFacebookF size={24} />
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="text-muted-foreground transition-colors hover:text-primary">
                  <FaXTwitter size={24} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/shows" className="text-muted-foreground transition-colors hover:text-primary">
                  Shows
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="text-muted-foreground transition-colors hover:text-primary">
                  Tickets
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-muted-foreground transition-colors hover:text-primary">
                  Store
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shows" className="text-muted-foreground transition-colors hover:text-primary">
                  <LuMail size={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          Records On The Wall © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

