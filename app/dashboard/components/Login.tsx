"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@/utils/databaseFunctions";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiArrowRightLine } from "react-icons/ri";
import "./login.css";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            console.log("Sign in with:", data);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
            <div className="fixed inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="default-container w-full max-w-[1000px] p-standard"
            >
                <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-800/50">
                    {/* Left Section - Welcome Text */}
                    <div className="hidden md:flex flex-col justify-center space-y-8">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300 border border-primary-500/20">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                                </span>
                                Welcome to Mira Dashboard
                            </div>
                            <div className="mt-6 space-y-4">
                                <h3 className="default-heading text-[2.75rem] md:text-[3.25rem] leading-[1.1] tracking-[-0.02em] font-bold text-white">
                                    Welcome back to{" "}
                                    <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                                        your workspace
                                    </span>
                                </h3>
                                <p className="default-text text-gray-300">
                                    Sign in to continue to your dashboard and access all features.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {["Real-time collaboration", "Advanced analytics", "Secure encryption"].map((feature) => (
                                <div key={feature} className="flex items-center gap-3 text-gray-400">
                                    <div className="h-1 w-1 rounded-full bg-primary-500" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Form */}
                    <div className="flex flex-col justify-center">
                        <div className="md:hidden text-center mb-8">
                            <h3 className="default-heading text-3xl text-white">Welcome Back</h3>
                            <p className="default-text text-sm mt-2 text-gray-300">Sign in to continue</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                            <div className="space-y-4">
                                <div>
                                    <label className="default-label flex items-center gap-2 text-gray-300">
                                        Email
                                        <span className="text-red-400 text-xs">*</span>
                                    </label>
                                    <div className="relative group">
                                        <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-400 transition-colors" />
                                        <input
                                            type="email"
                                            {...register("email", { 
                                                required: true,
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                            })}
                                            className="form-field pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="form-field-error mt-2 text-red-400">
                                            {errors.email.type === 'required' ? 'Email is required' : 'Please enter a valid email'}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="default-label flex items-center gap-2 text-gray-300">
                                        Password
                                        <span className="text-red-400 text-xs">*</span>
                                    </label>
                                    <div className="relative group">
                                        <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-400 transition-colors" />
                                        <input
                                            type="password"
                                            {...register("password", { 
                                                required: true,
                                                minLength: 6
                                            })}
                                            className="form-field pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="form-field-error mt-2 text-red-400">
                                            {errors.password.type === 'required' ? 'Password is required' : 'Password must be at least 6 characters'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="default-button w-full mt-6 bg-primary-500 hover:bg-primary-400 text-white group disabled:opacity-50 disabled:hover:bg-primary-500"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        Sign In
                                        <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-800/50"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-gray-900/40 text-gray-400">
                                        or continue with
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => signIn()}
                                className="default-button w-full bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-700/50 group"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FcGoogle className="text-xl" />
                                    <span>Sign in with Google</span>
                                    <RiArrowRightLine className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all -ml-4 group-hover:ml-0" />
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;