import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="space-y-8"> {/* Add vertical spacing between paragraphs */}
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-white text-center">About Us</h2>
        <p
          className={cn(
            "mx-auto max-w-[42rem] leading-relaxed text-white",
            "text-[18px] md:text-lg lg:text-2xl font-thin",
            "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
          )}
        >
          A full refresh of our main website has been planned for a few years now. We started out in 2018 as a music blog covering the local scene, with a spotlight on what was happening at the Rabbit Hole in Plaza Midwood (now Jack&#39;s Live). Artists like Jeff Austin, Billy Strings, Marcus King, Jon Stickley, and countless others were gracing the stage—yet no one in Charlotte was really shining a light on it (and they still aren&#39;t).
        </p>

        <p
          className={cn(
            "mx-auto max-w-[42rem] leading-relaxed text-white",
            "text-[18px] md:text-lg lg:text-2xl font-thin",
            "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
          )}
        >
          Fast forward to the COVID pandemic in 2020: we decided to pivot and start selling our own tickets for shows booked by my friend and partner Ryan Williams through Time2Fly Music. Records On The Wall also began co-promoting any shows Ryan booked. In 2022, Ryan moved to Denver, and I gradually took on booking responsibilities here in Charlotte, while Ryan continued building a presence in Denver.
        </p>

        <p
          className={cn(
            "mx-auto max-w-[42rem] leading-relaxed text-white",
            "text-[18px] md:text-lg lg:text-2xl font-thin",
            "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
          )}
        >
          Today, we&#39;re set up to keep booking the best local, regional, and national talent we can get our hands on.  If you&#39;re putting the grunt work in, we&#39;d love to work with you.
        </p>

        <p
          className={cn(
            "mx-auto max-w-[42rem] leading-relaxed text-white",
            "text-[18px] md:text-lg lg:text-2xl font-thin",
            "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
          )}
        >
          We hope you enjoy the new website and look forward to seeing you at an upcoming show!
        </p>

        <p
          className={cn(
            "mx-auto max-w-[42rem] leading-relaxed text-white",
            "text-[18px] md:text-lg lg:text-2xl font-thin",
            "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
          )}
        >
          Best,<br />
          Eric R. Levasseur<br />
          Founder • Product Engineer • Talent Buyer
        </p>
      </div>

      {/* FAQ Section */}
      <section className="container py-24"> {/* Adjust padding for spacing */}
        <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base md:text-lg">How does ticketing work?</AccordionTrigger>
              <AccordionContent className="text-base md:text-base font-thin">
                When you purchase a ticket through our app, you&#39;ll receive a few emails.  One with the purchase receipt and another with the event and ticket details.  Just provide your ID at the door and we&#39;ll have your name on the show list.  Max 8 tickets per order and all tickets are GA (general admission) unless otherwise noted.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base md:text-lg">How do I transfer or sell a ticket to someone?</AccordionTrigger>
                <AccordionContent className="text-base md:text-base font-thin">
                You&#39;ll need to make arrangements with that person.  Records On The Wall is not responsble for any secondary market transactions.  If you&#39;re transferring a ticket, you can simply email us <a href="mailto:info@recsonthewall.com" className="text-orange-500 font-light" target="_blank" rel="noopener noreferrer">here</a>.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base md:text-lg">Can I get a refund after I purchase?</AccordionTrigger>
              <AccordionContent className="text-base md:text-base font-thin">
                No.  All sales are final.  In the situation where the event gets canceled for any reason, we will refund your ticket purchase or exchange it for a future event.  If you can&#39;t make it to the event, you can transfer your ticket to someone else.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base md:text-lg">Do you share my email with anyone?</AccordionTrigger>
              <AccordionContent className="text-base md:text-base font-thin">
                Never. Your email stays with us and is only used for marketing purposes. We don&#39;t sell, rent, or share your information with third parties.  Stripe has their own privacy policy, which you can read <a href="https://stripe.com/privacy" className="text-orange-500 font-light" target="_blank" rel="noopener noreferrer">here</a>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base md:text-lg">What are the ticket fees?</AccordionTrigger>
              <AccordionContent className="text-base md:text-base font-thin">
                Fair and simple. Any ticket of $10 or more is $3.50/ticket. For tickets under $10, the fee is $1.00/ticket.  We also itemize all sales tax and fees before you get to checkout, so you know exactly what you&#39;re paying for. 
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-base md:text-lg">I have some questions about my purchase. What should I do?</AccordionTrigger>
                <AccordionContent className="text-base md:text-base font-thin">
                Send us a line. We&#39;re here to help you out anytime. You can email us <a href="mailto:info@recsonthewall.com" className="text-orange-500 font-light" target="_blank" rel="noopener noreferrer">here</a>.
                </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}