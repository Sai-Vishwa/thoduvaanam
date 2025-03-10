import { motion } from "framer-motion";
import SubTitle from "../../components/HelloPageComponents/SubTitle/SubTitle";
import Title from "../../components/HelloPageComponents/Title/Title";
import Button from "../../components/HelloPageComponents/Buttons/Button";

function HelloPage({isvisible}) {
  return (
    <div className="w-screen h-[100vh]  flex justify-evenly lg:items-center lg:p-0 md:items-center xs:p-[80px] xs:items-start   ">
       
        <div className="block">

        <div className="flex items-center justify-center mb-12 xl:hidden lg:hidden md:hidden">
            
            <motion.img
                src="jiji2.png"
                alt="Your Image"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover"
                initial={{ opacity: 0, y: "-100vw" }} // Start completely outside (right)
                animate={{ opacity: 1, y: 0 }} // Move to center
                transition={{ duration: 1, ease: "easeOut" ,}} // Smooth movement
            />
        </div>
            
                <motion.div
                className="w-full flex items-center justify-center lg:text-8xl xs:text-5xl md:text-6xl sm:text-5xl"
                initial={{ opacity: 0 }}
                animate={isvisible?{ opacity: 1 }:{opacity:0}}
                transition={{ duration: 3 }}
            >
                <Title 
                isvisible = {isvisible}/>
            </motion.div>

            <motion.div
                className="w-full flex text-[#000015] items-center justify-center lg:text-2xl xs:text-base md:text-xl sm:text-base "
                initial={{ opacity: 0 }}
                animate={isvisible?{ opacity: 1 }:{opacity:0}}
                transition={isvisible?{ duration: 1, delay: 4 }:{duration:1}} // Delay this animation after the first one
            >
                <SubTitle 
                isvisible={isvisible}/>
            </motion.div>
            <Button 
            isvisible={isvisible}/>

        </div>
        <div className="flex items-center justify-center mb-12 xs:hidden sm:hidden md:flex">
            
            <motion.img
                src="jiji2.png"
                alt="Your Image"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover"
                initial={{ opacity: 0, x: "100vw" }} // Start completely outside (right)
                animate={isvisible?{ opacity: 1, x: 0 }:{opacity:0 , x: "50vw"}} // Move to center
                transition={isvisible?{ duration: 3, ease: "easeOut" ,}:{duration:1 , ease:"easeOut"}} // Smooth movement'
            />
        </div>
    </div>
  );
}

export default HelloPage;
