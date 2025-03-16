import { Mail, Linkedin, Instagram } from 'lucide-react';

function CommonFooter() {
  return (
    <footer className="bg-[#1a1a1a] font-['Courier_New'] text-[#ddf3ef] w-full  flex z-50 py-6 border-t border-[#313131] ">
      <div className="container mx-auto">
        <div className="hidden md:flex w-full justify-between px-4">
          <div className="flex items-center space-x-3 justify-center md:justify-start ml-5">
            <div className="w-[180px] h-[60px] rounded-md flex items-center justify-center">
              <img src="./Intellexa_Logo_black_bg-removebg-preview-2.png" className="mt-3 w-[180px]" alt="Intellexa Logo" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#ddf3ef]">Aadukalam</h3>
              <p className="text-xs text-[#2bbdaa] font-[Courier_New]">The DSA Battlefield</p>
            </div>
          </div>
          
          <div className="text-center mr-10">
            <p className="text-sm text-[#ddf3ef]">Team Intellexa</p>
            <p className="text-xs italic text-[#2bbdaa] mb-2">"Innovate • Impact • Inspire"</p>
            <p className="text-xs text-gray-200">Rajalakshmi Engineering College - Chennai</p>
          </div>
          
          <div className="mr-5">
            <div className="flex items-center justify-center">
              <div className="block mx-auto">
                <div className="flex justify-center">
                  <p className="mb-3 text-sm text-[#ddf3ef] mx-auto">Reach us on</p>
                </div>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-300 hover:text-[#2bbdaa] transition-colors p-2 hover:bg-[#242424] rounded-full">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-[#2bbdaa] transition-colors p-2 hover:bg-[#242424] rounded-full">
                    <Mail size={20} />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-[#2bbdaa] transition-colors p-2 hover:bg-[#242424] rounded-full">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:hidden px-4 space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-[120px] h-[50px] rounded-md flex items-center justify-center">
              <img src="./Intellexa_Logo_black_bg-removebg-preview.png" className="mt-2 w-[110px]" alt="Intellexa Logo" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#ddf3ef]">Aadukalam</h3>
              <p className="text-xs text-[#2bbdaa] font-[Courier_New]">The DSA Battlefield</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-[#ddf3ef]">Team Intellexa</p>
            <p className="text-xs italic text-[#2bbdaa] mb-1">"Innovate • Impact • Inspire"</p>
            <p className="text-xs text-gray-200">Rajalakshmi Engineering College - Chennai</p>
          </div>
          
          <div className="mx-auto">
            <div className="text-center">
              <p className="mb-2 text-sm text-[#ddf3ef]">Reach us on</p>
            </div>
            <div className="flex items-center justify-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-[#2bbdaa] transition-colors p-2 hover:bg-[#242424] rounded-full">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#2bbdaa] transition-colors p-2 hover:bg-[#242424] rounded-full">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#2bbdaa] transition-colors p-2 hover:bg-[#242424] rounded-full">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CommonFooter;