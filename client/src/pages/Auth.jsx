import React from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../utils/firebase";
import { ServerUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = ({ isModel = false, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        {
          email: user.email,
          name: user.displayName,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto custom-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full"
      >
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-zinc-950 to-black border border-green-500/20">
          
          {/* Neon strip - kept as is */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-400 via-cyan-400 to-green-400" />

          <div className="p-6 md:p-8"> {/* Reduced padding from p-10 */}
            {/* Logo Section - Scaled Down */}
            <div className="flex flex-col items-center text-center mb-6"> {/* Reduced margin */}
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-400 text-black flex items-center justify-center">
                  <BsRobot size={24} />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <IoSparkles className="text-green-400" size={12} />
                <span className="text-green-300 text-[10px] uppercase tracking-wider font-medium">
                  Interview Intelligence
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                Launch{" "}
                <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
                  AI Interview
                </span>
              </h1>
            </div>

            {/* Stats - More Compact */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { label: "Sessions", val: "10K+", color: "text-green-400" },
                { label: "Roles", val: "50+", color: "text-cyan-400" },
                { label: "Adaptive", val: "AI", color: "text-green-300" }
              ].map((stat, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-white/5 p-2 text-center">
                  <div className={`text-sm font-bold ${stat.color}`}>{stat.val}</div>
                  <div className="text-[9px] text-zinc-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleAuth}
              className="group w-full rounded-xl p-[1px] bg-gradient-to-r from-green-400 to-cyan-400"
            >
              <div className="flex items-center justify-center gap-3 py-3 rounded-xl bg-black text-white group-hover:bg-zinc-950 transition">
                <FcGoogle size={20} />
                <span className="font-semibold text-base">Continue with Google</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;