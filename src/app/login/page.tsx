import "../globals.css"
import FlowLogo from "/public/FlowLogo.png"
import Image from 'next/image';
import Link from 'next/link';
import FourCats from "/public/FourCats.svg";

const LoginPage = () => {
    return (
        <div className="animated-gradient h-screen flex flex-row justify-center items-center">
            <div className="w-1/2 h-full items-center justify-end flex">
                <div className="bg-white w-3/5 h-4/5 rounded-2xl flex flex-col items-center justify-center gap-5 border border-black">
                    <p className="text-center">Are you ready to lock in?</p>
                    <Link href="/api/auth/login">
                        <button className="animated-gradient press-start text-3xl py-3 rounded-full pl-5 pr-5">LOGIN</button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 flex flex-col pl-10 pt-16">
                <Image src={FlowLogo} alt="Flow Logo" className="size-2/3"/>
                <Image src={FourCats} alt="Four Cats" className="size-2/3"/>
            </div>
        </div>
    );
}

export default LoginPage;
