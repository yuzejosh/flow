import Image from "next/image";
import FlowLogo from "/public/FlowLogo.png";

export default function Home() {
  return (
    <div className="animated-gradient h-screen flex flex-row justify-center items-center">
      <Image src={FlowLogo} alt="Flow Logo" className="size-1/4" />
    </div>
  );
}
