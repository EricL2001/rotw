import EmailSignup from "@/components/email-signup"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-lg">
      {/* Page Header */}
      <div className="text-center mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-4">
          SEE. MORE. MUSIC
        </h1>
        <p className="text-muted-foreground text-lg">
          Take the ride with 3,000+ other music freaks. Stay updated on shows, pre-sales, new merch and more.
        </p>
      </div>

      {/* Email Signup Component */}
      <EmailSignup className="mx-auto"/>
    </div>
  )
}