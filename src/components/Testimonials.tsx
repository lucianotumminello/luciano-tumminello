import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  titleCompany: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I have worked with many professionals throughout my journey but Luciano is a unique one to work with. I started my journey with Phuket Bay Group shortly after him and he helped me understand the company's internal process, culture and policies. His work ethics are pristine, and he is easily adjustable to any given situation while always maintaining an upbeat approach. His ability to go out of his way to help others and his multitasking skills let him stand out. Luciano would be an asset to any organization and earns my flying recommendation.",
    name: "Roberto Abbagnale",
    titleCompany: "General Manager, Hudo Hotel",
  },
  {
    quote:
      "Luciano joined our team in 2020 as a digital marketing consultant with considerable experience working across the region and he proved to be super professional and knowledgeable in this field. His work ranged from developing best practices for rolling out across our offices, coaching and mentoring team members, developing proposals to hands on delivery of campaigns.",
    name: "Elaine Hill",
    titleCompany: "Engagement Director, Greenpeace Southeast Asia",
  },
  {
    quote:
      "I highly recommend Luciano for his exceptional leadership, creativity, and team-building skills. As a Marketing Director, he fostered trust, offered innovative solutions, and ensured top-notch project execution. His communication and strategic vision make him an invaluable asset to any organization.",
    name: "Gammara Fiermandaputra",
    titleCompany: "Digital Marketing, SLow/Krakakoa",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-[#0a1f44] mb-12 md:mb-16">
          What People Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-teal-600" />
              </div>

              <blockquote className="italic text-gray-700 text-sm md:text-base leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-auto">
                <p className="font-bold text-[#0a1f44] text-sm md:text-base">
                  {t.name}
                </p>
                <p className="text-gray-500 text-xs md:text-sm mt-0.5">
                  {t.titleCompany}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
