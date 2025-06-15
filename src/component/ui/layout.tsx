import Image from "next/image"
import Footer from "./footer"
import Header from "./header"
import Bg from "../../../public/bg-plane.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen min-h-screen flex flex-col gap-6 bg-transparent relative z-10">
            <div className="absolute inset-0 z-0">
                <Image
                    src={Bg}
                    alt="Airplane Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-10"
                />
            </div>
            <Header></Header>
            <div className="max-w-7xl z-20 mx-auto w-full mt-28"> {children}</div>
            <Footer></Footer>
        </div>
    )
}