import { cn } from "@/lib/utils"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="space-y-8"> {/* Add vertical spacing between paragraphs */}
        <h2 className="font-medium text-xl sm:text-2xl md:text-3xl text-white text-center">About Us</h2>
        <p
          className={cn(
            "mx-auto max-w-[42rem] leading-relaxed text-white",
            "text-[18px] md:text-lg lg:text-2xl font-thin",
            "animate-in fade-in-5 slide-in-from-bottom-20 duration-1000",
          )}
        >
          A full refresh of our main website has been in the works for a few years now. We started out in 2018 as a music blog covering the local scene, with a spotlight on what was happening at the Rabbit Hole in Plaza Midwood (now Jack&#39;s Live). Artists like Jeff Austin, Billy Strings, Marcus King, Jon Stickley, and countless others were gracing the stage—yet no one in Charlotte was really shining a light on it (and they still aren&#39;t).
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
          Today, we&#39;re set up to keep booking the best local and national talent we can get our hands on.
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
          Founder & Product Engineer
        </p>
      </div>
    </div>
  );
}