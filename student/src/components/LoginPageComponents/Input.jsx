import SubmitButton from "./SubmitButton";
import { motion , AnimatePresence } from "framer-motion";

function Input({setLoginData , loginData , loginError , forgotPassword , setLoginError , setLoading , setForgotPassword, setOTPdiv}){


    const toggleForgotPassword = () => {
        setForgotPassword(prev => ({
          val: prev.style === "block" ? "Remember password?" : "Forgot password?",
          style: prev.style === "block" ? "hidden" : "block"
        }));
        setLoginError({ ...loginError, passwordError: "" });
      };



    return (
        <>
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <input
              type="text"
              placeholder="Registration Number"
              value={loginData.rno}
              onChange={(e) => setLoginData({ ...loginData, rno: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
            />
            {loginError.rnoError && (
              <p className="text-[#000015] text-sm mt-1">{loginError.rnoError}</p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {forgotPassword.style === "block" ? (
              <motion.div
                key="password"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
                />
                {loginError.passwordError && (
                  <p className="text-[#000015] text-sm mt-1">{loginError.passwordError}</p>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

            <SubmitButton 
            loginData={loginData}
            loginError={loginError}
            setLoading={setLoading}
            setLoginError={setLoginError}
            forgotPassword={forgotPassword}
            setOTPdiv={setOTPdiv}/>

          <motion.button
            layout
            onClick={toggleForgotPassword}
            className="w-full text-[#000015] text-sm hover:text-gray-800 font-mono mt-2"
            whileHover={{ scale: 1.02 }}
          >
            {forgotPassword.val}
          </motion.button>
        </motion.div>
        </>
    )
}
export default Input;