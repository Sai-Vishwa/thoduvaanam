import { motion } from "framer-motion";
import "./Button.scss";

function Button() {
    return (
        <div className="flex w-full h-full items-center justify-between">
            <motion.div 
                className="button-container-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 4 }}
            >
                <span className="mas">LOGIN</span>
                <button type="button" name="Hover">LOGIN</button>
            </motion.div>

            <motion.div 
                className="button-container-2"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 4 }}
            >
                <span className="mas">SIGN UP</span>
                <button type="button" name="Hover">SIGN UP</button>
            </motion.div>
        </div>
    );
}

export default Button;
