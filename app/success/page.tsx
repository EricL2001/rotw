// import { redirect } from 'next/navigation'
// import { stripe } from '@/lib/stripe'
// import Link from 'next/link'
// import { CircleCheck } from 'lucide-react';
// import { Suspense } from 'react';

// async function SuccessContent({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
//   "use cache"
  
//   const { session_id } = await searchParams

//   if (!session_id) {
//     return redirect('/')
//   }

//   try {
//     const session = await stripe.checkout.sessions.retrieve(session_id, {
//       expand: ['line_items', 'payment_intent']
//     })

//     const { status, customer_details } = session
//     const customerEmail = customer_details?.email

//     if (status === 'open') {
//       return redirect('/')
//     }

//     if (status === 'complete') {
//       return (
//         <section className="max-w-2xl mx-auto text-center space-y-4">
//           <div className="flex justify-center">
//             <CircleCheck className="h-16 w-16 text-green-500" />
//           </div>
//           <h1 className="text-3xl font-bold text-green-500">Payment Successful!</h1>
//           <p className="text-lg">
//             We appreciate your business and hope you enjoy the show! A confirmation email will be sent to{' '}
//             <span className="font-medium">{customerEmail}</span>
//           </p>
//           <div className="pt-4">
//             <Link
//               href="/"
//               className="text-blue-500 hover:text-blue-400 underline"
//             >
//               ← Return to home
//             </Link>
//           </div>
//         </section>
//       )
//     }

//     return redirect('/')
//   } catch (error) {
//     console.error('Error retrieving session:', error)
//     return redirect('/')
//   }
// }

// function SuccessLoading() {
//   return (
//     <section className="max-w-2xl mx-auto text-center space-y-4">
//       <div className="flex justify-center">
//         <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
//       </div>
//       <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse" />
//       <div className="h-6 w-96 mx-auto bg-gray-200 rounded animate-pulse" />
//       <div className="pt-4">
//         <div className="h-5 w-32 mx-auto bg-gray-200 rounded animate-pulse" />
//       </div>
//     </section>
//   )
// }

// export default function SuccessPage({
//   searchParams
// }: {
//   searchParams: Promise<{ session_id?: string }>
// }) {
//   return (
//     <main className="container mx-auto px-4 py-8">
//       <Suspense fallback={<SuccessLoading />}>
//         <SuccessContent searchParams={searchParams} />
//       </Suspense>
//     </main>
//   )
// }

import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { CircleCheck } from 'lucide-react';
import { Suspense } from 'react';

async function SuccessContent({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams

  if (!session_id) {
    return redirect('/')
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    })

    const { status, customer_details } = session
    const customerEmail = customer_details?.email

    if (status === 'open') {
      return redirect('/')
    }

    if (status === 'complete') {
      return (
        <section className="max-w-2xl mx-auto text-center space-y-4">
          <div className="flex justify-center">
            <CircleCheck className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-500">Payment Successful!</h1>
          <p className="text-lg">
            We appreciate your business and hope you enjoy the show! A confirmation email will be sent to{' '}
            <span className="font-medium">{customerEmail}</span>
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-400 underline"
            >
              ← Return to home
            </Link>
          </div>
        </section>
      )
    }

    return redirect('/')
  } catch (error) {
    console.error('Error retrieving session:', error)
    return redirect('/')
  }
}

function SuccessLoading() {
  return (
    <section className="max-w-2xl mx-auto text-center space-y-4">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
      </div>
      <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse" />
      <div className="h-6 w-96 mx-auto bg-gray-200 rounded animate-pulse" />
      <div className="pt-4">
        <div className="h-5 w-32 mx-auto bg-gray-200 rounded animate-pulse" />
      </div>
    </section>
  )
}

export default function SuccessPage({
  searchParams
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<SuccessLoading />}>
        <SuccessContent searchParams={searchParams} />
      </Suspense>
    </main>
  )
}