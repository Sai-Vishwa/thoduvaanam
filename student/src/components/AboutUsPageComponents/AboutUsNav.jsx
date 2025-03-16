import { Mail, Linkedin, Instagram, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function AboutUsNav(){

  const nav = useNavigate();

    
    return (
        <div className="bg-[#1a1a1a] font-['Courier_New'] text-[#ddf3ef] w-full  flex justify-between px-6 py-4 z-50  items-center border-t border-[#313131] sticky h-[] transform top-0">
        <div className="flex space-x-6 md:space-x-10">
          <button className="cursor-pointer basic-1  hover:text-[#36ead2] transition-colors" onClick={()=>{nav("/login")}}>Login</button>
          <button className="cursor-pointer basic-1  hover:text-[#36ead2] transition-colors" onClick={()=>{nav("/signup")}}>Sign Up</button>
        </div>
        <button className="flex items-center space-x-2 cursor-pointer basic-1  hover:text-[#36ead2] transition-colors" onClick={()=>{nav("/")}}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
    )

}

export default AboutUsNav