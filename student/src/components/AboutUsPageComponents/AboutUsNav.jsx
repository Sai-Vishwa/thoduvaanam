import { Mail, Linkedin, Instagram, ArrowLeft } from 'lucide-react';


function AboutUsNav(){

    
    return (
        <div className="bg-[#1a1a1a] font-['Courier_New'] text-white w-full  flex justify-between px-6 py-4 z-50  items-center border-t border-[#313131] sticky h-[] transform top-0">
        <div className="flex space-x-6 md:space-x-10">
          <button className="cursor-pointer basic-1  hover:text-[#61dafb] transition-colors">Login</button>
          <button className="cursor-pointer basic-1  hover:text-[#61dafb] transition-colors">Sign Up</button>
        </div>
        <button className="flex items-center space-x-2 cursor-pointer basic-1  hover:text-[#61dafb] transition-colors">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
    )

}

export default AboutUsNav