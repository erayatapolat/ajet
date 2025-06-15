import Image from "next/image";
import PlaneBG from "../../public/bg-plane.jpg"
import Seat from "../../public/seat.svg"
import Luggage from "../../public/luggage.svg"
import Cafe from "../../public/cafe.svg"
import Sport from "../../public/sports.svg"
import Lounge from "../../public/lounge.svg"

const services = [
  { title: "Koltuk Seçimi", icon: Seat},
  { title: "Fazla Bagaj", icon: Luggage },
  { title: "AJet Cafe", icon: Cafe },
  { title: "Spor Ekipmanı", icon: Sport },
  { title: "CIP Lounge", icon: Lounge },
];

export default function ExtraServicesSection() {
  return (
    <section className="relative rounded-2xl bg-transparent overflow-hidden py-12 px-6 md:px-16">
      {/* Background Cloud with Airplane */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={PlaneBG} // 👈 yüklediğin görseli buraya koy
          alt="Plane flying"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xs" />
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366]">
          <span className="text-[#007AFF]">Ek</span> Hizmetlerimiz
        </h2>
        <p className="mt-2 text-gray-700 text-base md:text-lg">
          Ek hizmetlerimizin üzerine tıklayarak daha detaylı bilgi alabilirsiniz.
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {services.map(({ title, icon }) => (
          <button
            key={title}
            className="flex flex-col items-center justify-center w-full h-32 bg-white rounded-xl shadow-sm hover:shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Image src={icon} alt={title} width={40} height={40} />
            <span className="mt-3 font-medium text-gray-800">{title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
