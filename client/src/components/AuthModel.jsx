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
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* MODAL CONTAINER */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        
        {/* We simplify the wrapper to avoid "Box-in-a-Box" height stacking */}
        <div className="relative">
          
          {/* Floating Close Button - Positioned outside or on edge to save internal space */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-zinc-900 border border-white/10 text-white flex items-center justify-center hover:bg-green-500/20 transition-all cursor-pointer z-50"
          >
            ✕
          </button>

          {/* This is where Auth sits. We remove the extra padding/headers of the model */}
          <Auth isModel={true} onClose={onClose} />
          
        </div>
        
        {/* Minimal Footer Status below the card instead of inside */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-zinc-500 uppercase tracking-widest">
           <span className="flex items-center gap-1.5">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             Secure
           </span>
           <span>•</span>
           <span>AI OS v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default AuthModel;