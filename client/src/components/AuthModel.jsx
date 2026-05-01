import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "../pages/Auth";
import { HiSparkles } from "react-icons/hi";

const AuthModel = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      onClose();
    }
  }, [userData, onClose]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 overflow-hidden">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
      />

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:55px_55px]" />

      {/* GLOW BLOBS */}
      <div className="absolute top-20 left-20 h-72 w-72 bg-green-500/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-20 h-80 w-80 bg-cyan-500/15 blur-[150px] rounded-full pointer-events-none" />



      {/* MODAL */}
      <div className="relative z-10 w-full max-w-lg">

        <div
          className="
          relative
          rounded-[36px]
          overflow-hidden
          border border-green-500/20
          bg-zinc-950/95
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(0,0,0,.5)]
        "
        >

          {/* HEADER */}
          <div className="relative px-8 pt-7 pb-5 border-b border-white/5">

            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            <div className="relative flex items-start justify-between gap-4">

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <HiSparkles className="text-green-400" />
                  <span className="text-sm text-green-300">
                    AI Interview Access
                  </span>
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-green-300 to-cyan-300 bg-clip-text text-transparent">
                  Initialize PrepFlow
                </h2>

                <p className="text-zinc-500 mt-2 text-sm">
                  Login to launch interview sessions.
                </p>
              </div>


              {/* WORKING CLOSE BUTTON */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="
                shrink-0
                w-11 h-11
                rounded-2xl
                bg-white/5
                border border-white/10
                text-zinc-400
                hover:text-white
                hover:border-green-500/30
                hover:rotate-90
                transition-all
                flex items-center justify-center
                cursor-pointer
                "
              >
                ✕
              </button>

            </div>
          </div>


          {/* AUTH WRAPPER */}
          <div className="relative p-6 md:p-8">

            <div className="absolute inset-0 bg-gradient-to-b from-green-500/[0.02] to-transparent pointer-events-none" />

            <div className="relative rounded-[30px] bg-black/30 border border-white/5 p-4 md:p-6">
              
              {/* IMPORTANT FIX: pass onClose */}
              <Auth
                isModel={true}
                onClose={onClose}
              />

            </div>

          </div>


          {/* FOOTER STATUS */}
          <div className="px-8 py-5 border-t border-white/5 flex items-center justify-between text-xs">

            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Authentication Secure
            </div>

            <div className="text-zinc-600">
              AI OS v1.0
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthModel;