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
    <div
      className={`${
        isModel ? "min-h-0 py-0" : "min-h-screen"
      } flex items-center justify-center px-6`}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        {/* Glow */}
        <div className="absolute -inset-6 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />

        <div
          className="
          relative
          overflow-hidden
          rounded-[36px]
          bg-gradient-to-b from-zinc-950 to-black
          border border-green-500/20
          shadow-[0_0_70px_rgba(0,0,0,.45)]
        "
        >
          {/* CLOSE BUTTON */}
          {isModel && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="
              absolute top-4 right-4 z-[9999]
              w-10 h-10
              rounded-full
              bg-zinc-900
              border border-green-400/30
              text-green-300
              flex items-center justify-center
              hover:bg-green-500/20
              hover:rotate-90
              transition-all duration-300
              cursor-pointer
              "
            >
              ✕
            </button>
          )}

          {/* Neon strip */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-green-400 via-cyan-400 to-green-400" />

          <div className="p-10">
            {/* Logo */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-green-400 to-cyan-400 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,.35)]">
                  <BsRobot size={34} />
                </div>

                <div className="absolute -inset-2 bg-green-400/20 blur-xl rounded-[30px] -z-10 pointer-events-none" />
              </div>

              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <IoSparkles className="text-green-400" />
                <span className="text-green-300 text-sm">
                  Interview Intelligence Core
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Launch
                <span className="block mt-3 bg-gradient-to-r from-green-300 via-cyan-300 to-green-400 bg-clip-text text-transparent">
                  AI Smart Interview
                </span>
              </h1>

              <p className="mt-6 text-zinc-500 leading-relaxed max-w-sm">
                Authenticate to access adaptive interview simulations and AI
                feedback engine.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl bg-white/5 border border-white/5 p-4 text-center">
                <div className="text-xl font-bold text-green-400">10K+</div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Sessions
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-4 text-center">
                <div className="text-xl font-bold text-cyan-400">50+</div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Roles
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/5 p-4 text-center">
                <div className="text-xl font-bold text-green-300">AI</div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Adaptive
                </div>
              </div>
            </div>

            {/* Login */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleAuth}
              className="group w-full rounded-2xl p-[1px] bg-gradient-to-r from-green-400 to-cyan-400 shadow-[0_0_35px_rgba(34,197,94,.25)]"
            >
              <div className="flex items-center justify-center gap-4 py-4 rounded-2xl bg-black text-white group-hover:bg-zinc-950 transition">
                <FcGoogle size={22} />
                <span className="font-semibold text-lg">
                  Continue with Google
                </span>
              </div>
            </motion.button>

            <div className="flex items-center justify-center gap-2 mt-8 text-xs text-zinc-600">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Secure Authentication Active
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;