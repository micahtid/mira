"use client";

import { signIn } from "@/utils/databaseFunctions";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaGithub } from "react-icons/fa";

const Login = () => {
    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 sm:px-6">
            <div className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[1000px]"
            >
                <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 md:gap-12 bg-gray-900/40 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-gray-800/50 shadow-xl">
                    {/* Left Section - Welcome Text */}
                    <div className="flex flex-col justify-center space-y-8 md:space-y-10 text-center md:text-left">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300 border border-primary-500/20 shadow-sm">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                                </span>
                                Welcome to the Mira Dashboard
                            </div>
                            <div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
                                <h3 className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] tracking-[-0.02em] font-bold text-white">
                                    Welcome Back To{" "}
                                    <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                                        Your Workspace
                                    </span>
                                </h3>
                                <p className="text-base md:text-md text-gray-300/90 leading-relaxed max-w-[90%] mx-auto md:mx-0">
                                    We prioritize your privacy and do not misuse your data.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Social Logins */}
                    <div className="flex flex-col justify-center space-y-4 md:space-y-5 md:px-4">                        
                        <button
                            onClick={() => signIn()}
                            className="w-full py-3.5 px-6 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl font-medium border border-gray-700/50 transition-all duration-200"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <FcGoogle className="text-xl" />
                                <span className="text-sm md:text-base">Continue with Google</span>
                            </div>
                        </button>

                        <button
                            onClick={() => signIn()}
                            className="w-full py-3.5 px-6 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-white rounded-xl font-medium border border-[#5865F2]/20 transition-all duration-200"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <FaDiscord className="text-xl text-[#5865F2]" />
                                <span className="text-sm md:text-base">Continue with Discord</span>
                            </div>
                        </button>

                        <button
                            onClick={() => signIn()}
                            className="w-full py-3.5 px-6 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl font-medium border border-gray-700/50 transition-all duration-200"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <FaGithub className="text-xl" />
                                <span className="text-sm md:text-base">Continue with GitHub</span>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;