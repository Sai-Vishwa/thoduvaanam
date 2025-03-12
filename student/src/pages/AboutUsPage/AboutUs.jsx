import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../index.css';
import Typewriter from "./frf";
import { Mail, Linkedin, Instagram, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from "sonner";
import AboutUsNav from "../../components/AboutUsPageComponents/AboutUsNav";
import CommonFooter from "../../components/Common/CommonFooter";

function AboutUs() {



  const [thank , setThank] = useState(0);

  const nav = useNavigate();



  useEffect(()=>{
    if(thank>5){
      toast.message("This site is made possible by the contributions of Prasanth , Poorvaja etc..",{
        className:""
      })
      setThank(0);
    }
  },[thank])
  useEffect(() => {
    const font = new FontFace("Liberty", "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf')");
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  }, []);

  return (

    

    

    <div className="main block h-screen w-screen bg-[#242424] relative">

        <div className="w-full h-[10vh]"> 
        
              <AboutUsNav />
        </div>

        <div className="lg:h-[70vh] md:h-[150vh] sm:h-[150vh] xs:h-[150vh] bg-green-300 text-green-700">
          vanakkam
        </div>

        <div className="w-full">
          
              <CommonFooter />
        </div>

    </div>
  );
}

export default AboutUs;