import { motion } from "framer-motion";
import Title from "../../components/HelloPageComponents/Title/Title";
import SubTitle from "../../components/HelloPageComponents/SubTitle/SubTitle";
import Button from "../../components/HelloPageComponents/Buttons/Button";
import './LanderPage.scss'


function Hello1({isvisible}) {
  return (
    <div className="w-screen h-[100vh] flex justify-center items-center relative">
        <motion.div
        initial={{opacity:0}}
        transition={{duration:1,delay:2.5}}
        animate={{opacity:1}}
        className="absolute text-[#ffffec] transform bottom-0 text-sm  -translate-y-[40px] pb-2 cursor-pointer basic-1">
                Know about this site
        </motion.div>
        
       
        <div className="block mb-12">

       
            <div>
            
            <motion.div
                className="mx-auto flex items-center justify-center lg:text-8xl xs:text-5xl md:text-6xl sm:text-5xl"
                initial={{ opacity: 0 }}
                animate={isvisible?{ opacity: 1 }:{opacity:0}}
                transition={{ duration: 3 }}
                >
            
                    
                <Title 
                isvisible = {isvisible}/>
                
                
            </motion.div>
            </div>
            
            
            <div>
            <motion.div
                className="w-full flex text-[#000015] items-center justify-center lg:text-xl xs:text-base md:text-xl sm:text-base "
                initial={{ opacity: 0 }}
                animate={isvisible?{ opacity: 1 }:{opacity:0}}
                transition={isvisible?{ duration: 1, delay: 2.5 }:{duration:1}} // Delay this animation after the first one
            >
                <SubTitle 
                isvisible={isvisible}/>
            </motion.div>
            </div>
            <div className="flex justify-center items-center">
                <Button 
                isvisible={isvisible}/>
            </div>
           

        </div>
        {/* <div className="flex items-center justify-center mb-12 xs:hidden sm:hidden md:flex">
            
            <motion.img
                src="jiji2.png"
                alt="Your Image"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover"
                initial={{ opacity: 0, x: "100vw" }} // Start completely outside (right)
                animate={isvisible?{ opacity: 1, x: 0 }:{opacity:0 , x: "50vw"}} // Move to center
                transition={isvisible?{ duration: 3, ease: "easeOut" ,}:{duration:1 , ease:"easeOut"}} // Smooth movement'
            />
        </div> */}
        <footer>
            
        </footer>
    </div>
  );
}

export default Hello1;
