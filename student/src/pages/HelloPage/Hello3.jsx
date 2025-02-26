import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import HelloPage from "./HelloPage";
import SecondPart from "./SecondPart";
import Footer from "./Footer";


function HelloThree(){

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    

    return (

        <div className="overflow-x-hidden h-[1100vh] text-[#000015] bg-[#e5ffdf]">

            <div className="h-[100vh]">
                <HelloPage 
                    isvisible={scrollY>100?false:true}
                />
            </div>
            <div className="flex w-full h-[100vh] text-xl" >
                <SecondPart 
                isvisible={scrollY}/>
                
            </div>
            
           

        </div>

    )


}

export default HelloThree