import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import HelloPage from "./HelloPage";
import SecondPart from "./SecondPart";


function HelloThree(){

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    

    return (

        <div className="overflow-x-hidden h-[220vh] text-[#000015] bg-[#ffe6cf]">

            <div className="h-[100vh]">
                <HelloPage 
                    isvisible={scrollY>100?false:true}
                />
            </div>
            <div className="flex w-full h-[100vh] text-6xl bg-red-500" >
                <div className="flex w-1/2 justify-center items-center bg-green-500">
                <SecondPart 
                isvisible={scrollY}/>
                </div>
                <div>

                </div>
                
            </div>
            <div className="h-[20vh] flex bg-[#000015]">

            </div>

        </div>

    )


}

export default HelloThree