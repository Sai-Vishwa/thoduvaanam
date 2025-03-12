import { Mail, Linkedin, Instagram, ArrowLeft } from 'lucide-react';


function AboutUsNav(){

    return (
        <header className="bg-[#1a1a1a] font-['Courier_New'] text-white w-full  flex justify-between p-6 z-50  border-t border-[#313131] sticky transform top-0">
        <div className="flex space-x-6 md:space-x-10">
          <button className="cursor-pointer basic-1 py-2 hover:text-[#61dafb] transition-colors">Login</button>
          <button className="cursor-pointer basic-1 py-2 hover:text-[#61dafb] transition-colors">Sign Up</button>
        </div>
        <button className="flex items-center space-x-2 cursor-pointer basic-1 py-2 hover:text-[#61dafb] transition-colors">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </header>
    )

}

export default AboutUsNav