import { FooterCol } from "../components";
import { BsYoutube, BsLinkedin, BsTwitterX } from "react-icons/bs";
import logo from "../../public/assets/logo.png";

const Footer = () => {
  return (
    <div className="flex w-full flex-col bg-extraDark py-12 md:flex-row md:px-12 md:py-4">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-6 md:items-start">
        <img src={logo} className="w-[8rem]" />
        <p className="family-inter text-center text-[1rem] font-normal text-white/60 md:text-left">
          Aidcircle Foundation
        </p>
        <div className="socials flex space-x-4 text-white">
          <BsYoutube size={22} className="" />
          <BsLinkedin size={18} />
          <BsTwitterX size={18} />
        </div>
      </div>
      <FooterCol />
    </div>
  );
};

export default Footer;
