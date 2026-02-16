import Image from "next/image";
import logo from "../../../public/NEXAAALI.png";

type LogoProps = {
    size?: number;        // square size (px)
    width?: number;       // custom width
    height?: number;      // custom height
    className?: string;
    priority?: boolean;
};

export default function Logo({
    size,
    width,
    height,
    className = "",
    priority = false,
}: LogoProps) {

    const w = size || width || 120;
    const h = size || height || 120;

    return (
        <div
            className={`relative ${className}`}
            style={{ width: w, height: h }}
        >
            <Image
                src={logo}
                alt="Nexaali Logo"
                fill
                priority={priority}
                className="object-contain p-0 m-0"
            />
        </div>
    );
}
