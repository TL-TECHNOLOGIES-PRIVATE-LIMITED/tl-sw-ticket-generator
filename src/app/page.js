"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import logo from '../../public/logo.avif'
import FormComponent from "@/components/FormComponent";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden">
      {/* Background Video */}
      {/* <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Main Content */}
      <div className="h-full w-full relative flex overflow-y-auto bg-stone-950 bg-opacity-10">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full md:w-fit">
          {/* Content Boxes */}
          <div className="flex flex-col lg:flex-row justify-center  overflow-hidden items-center p-2 gap-3 w-full md:w-fit bg-black/30 text-white mt-10  ">
            
            {/* Left Box */}
            <div className="bg-white md:w-[570px] w-full md:h-[600px] relative h-[420px] min-w-[300px] max-w-[570px] shadow-md shadow-black bg-cover" 
              style={{ backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/projects/max_808/fbdcd2130720967.Y3JvcCwyMDQ1LDE2MDAsMjI3LDA.jpg')" }}>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              {/* Logo */}
              {/* <Image src={logo} alt="logo" className="m-2 h-10 w-auto rounded-lg absolute" /> */}
              
              {/* Breaking News Marquee */}
              <div className="absolute bottom-4 px-2 w-full  text-stone-100 py-2 overflow-hidden">
                <button className="font-serif text-2xl  bg-white text-black  p-2  rounded-lg  rounded-s-none">Book your slote</button>
                <h1 className="font-serif  text-yellow-200 text-5xl">SWAYMVARA SILKS</h1>
                <div className="whitespace-nowrap animate-marquee text-4xl  font-serif ">
                   - NEW COLLECTION LAUNCHING SOON!
                </div>
              </div>
            </div>

            {/* Right Box */}
            <div className="md:w-[570px] w-full md:h-[600px] h-fit min-w-[300px] overflow-y-scroll max-w-[100%] bg-cover bg-center rounded-lg">
              <FormComponent />
            </div>
          </div>

          {/* Footer */}
          <p className="md:mt-4 py-2 text-center w-full bg-black md:bg-transparent md:text-md text-xs text-black font-bold">
            &#169; 2024 -{" "}
            <Link href="https://www.tltechnologies.net/" target="_blank">
              TL TECHNOLOGIES
            </Link>
            . ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
