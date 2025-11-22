import Image from "next/image";
import orditLogo from "@/public/logo.png";

export function OrditLogo() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <Image src={orditLogo} alt="Ordit Logo" width={200} height={200} />
      </div>
    </div>
  )
}
