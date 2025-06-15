import Image from "next/image";
import Link from "next/link";
import MobilApp from "../../../public/ajet-mobile-app-tr.png"

export default function Footer() {
  return (
    <footer className="bg-[#002352] text-white pt-16 container mx-auto rounded-t-2xl max-w-7xl z-10 mt-auto">
      {/* Mobil App Promo */}
      <div className="max-w-6xl mx-auto md:flex justify-between items-center rounded-2xl">
        <Image alt="mobilApp" src={MobilApp}></Image>
      </div>

      {/* Ana Linkler */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 mt-16">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#4ADE80]">Kurumsal</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">Hakkımızda</Link></li>
            <li><Link href="#">Kariyer</Link></li>
            <li><Link href="#">Basın</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#4ADE80]">Uçuş Bilgileri</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">Sefer Noktaları</Link></li>
            <li><Link href="#">Online Check-in</Link></li>
            <li><Link href="#">Bilet Sorgulama</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#4ADE80]">Yardım & Destek</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">İletişim</Link></li>
            <li><Link href="#">Sıkça Sorulan Sorular</Link></li>
            <li><Link href="#">Canlı Destek</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#4ADE80]">Bizi Takip Edin</h3>
          <div className="flex gap-4">
            <Link href="#"><Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} /></Link>
            <Link href="#"><Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} /></Link>
            <Link href="#"><Image src="/icons/x.svg" alt="X" width={24} height={24} /></Link>
            <Link href="#"><Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} /></Link>
          </div>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="border-t border-gray-700 mt-12 py-6 text-sm text-center text-gray-400">
        <p>© 2025 Havayolu A.Ş. Tüm hakları saklıdır. &nbsp;
          <Link href="#" className="underline">Gizlilik Politikası</Link> | 
          <Link href="#" className="underline ml-2">Çerez Ayarları</Link>
        </p>
      </div>
    </footer>
  );
}
