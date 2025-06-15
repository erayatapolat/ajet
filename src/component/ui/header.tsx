"use client"
import Image from "next/image";
import Ajet from "../../../public/ajet.svg";
import LanguageSelection from "../dropdown/language";
import AuthButton from "../AuthButton";
import { useRouter } from "next/navigation";

export default function Header() {
    const route = useRouter();
    return (
        <header className="w-full mt-4 fixed top-0 z-50">
            <div className="mx-auto w-full max-w-7xl h-[70px] flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#0090FF] to-[#002B5B] relative overflow-visible px-4 md:px-8">
                <div className="flex items-center" onClick={()=>(route.push('/'))}>
                    <Image src={Ajet} alt="Ajet Logo" height={36} className="h-9 w-auto" />
                </div>
                <nav className="hidden md:flex gap-10 text-white text-base font-medium">
                    <a href="#">Services</a>
                    <a href="#">Travels</a>
                    <a href="#">About</a>
                    <a href="#">FAQ</a>
                </nav>
                <div className="flex gap-4 items-center">
                    <LanguageSelection></LanguageSelection>
                    <AuthButton></AuthButton>
                </div>
            </div>
        </header>
    );
}
