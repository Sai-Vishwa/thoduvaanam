import { motion } from "framer-motion";

function Footer({isVisible}){

    return (
        <motion.div
            className={`w-full h-full bg-[#000015] text-[#e5ffdf]`}
            initial={{opacity:0 , y:"-100vhh"}}
            animate={isVisible<4500?{opacity:0,y:"-100vh"}:{opacity:1,y:0}}
            transition={{duration:1,delay:1}}
        >
                This is the footer
        </motion.div>
    )
}

export default Footer;