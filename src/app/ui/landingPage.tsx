import React from 'react';
import FlowLogo from "/public/FlowLogo.png";
import Demo from "/public/Demo.png";
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="landing-page w-full flex flex-col">

        <div className="flex justify-center items-center -mt-10">
            <Image src={FlowLogo} alt="Flow Logo" priority={true} className="size-1/3"/>
        </div>

        <div className="inline-grid grid-cols-3 h-1/5 -mt-28">
            <p className="flex items-center justify-center text-base text-center press-start">About us</p>
            <p className="flex items-center justify-center text-base text-center press-start">Features</p>
            
            <div className="flex items-center justify-center">
                <Link href="/login">
                    <button className="bg-white press-start text-base py-3 rounded-full pl-5 pr-5 border border-black">LOGIN / SIGN UP</button>
                </Link>
            </div>
        </div>

        <div className="flex justify-center items-center gap-8">
            <div>
                <p className='font-bold text-2xl max-w-md'>Ever feel like organising group meetings are an impossible task?</p>
                <p className='font-bold text-2xl pt-8 max-w-md'>Structuring productive meetings will never be the same with <span className ="text-blue-500">Flow</span>.</p>
                <p className='font-bold text-2xl pt-8 max-w-md'>Communicate seamlessly with group members to optimise meeting productivity and task assignment.</p>
            </div>
            <div>
                <Image src={Demo} alt="Demo Image" className=""/>
            </div>
        </div>
    </div>
  );
};

export default LandingPage;