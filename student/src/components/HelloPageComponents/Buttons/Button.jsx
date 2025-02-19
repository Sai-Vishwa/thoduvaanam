import { motion } from "framer-motion";
import "./Button.scss";
import { useNavigate } from "react-router-dom";

function Button() {
    const nav = useNavigate();
    return (
        <div className="flex w-full h-full items-center ">
            <motion.div 
                className="button-container-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
            >
                <span className="mas">LOGIN</span>
                <button type="button" name="Hover" onClick={()=>{nav("/login")}}>LOGIN</button>
            </motion.div>

            <motion.div 
                className="button-container-2"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
            >
                <span className="mas">SIGN UP</span>
                <button type="button" name="Hover" onClick={()=>{nav("/signup")}}>SIGN UP</button>
            </motion.div>
        </div>
    );
}

export default Button;
