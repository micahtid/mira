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
            // TODO: Implement email/password sign in
            console.log("Sign in with:", data);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-[#fafafa] dark:bg-gray-950">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="default-container w-full max-w-[1100px] p-6"
            >
                <div className="grid md:grid-cols-[1.2fr,1fr] gap-16 bg-white dark:bg-gray-900 p-10 md:p-14 rounded-[20px] shadow-[0_8px_40px_rgb(0,0,0,0.04)] dark:shadow-none">
                    {/* Left Section - Welcome Text */}
                    <div className="hidden md:flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-full bg-primary-50/80 dark:bg-primary-950/50 px-4 py-1.5 text-sm text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-900">
                                    <span className="relative flex h-2 w-2 mr-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                                    </span>
                                    Welcome to Mira Dashboard
                                </div>
                                <div className="space-y-4">
                                    <h3 className="default-heading text-[3.25rem] leading-[1.1] tracking-[-0.02em] font-bold text-gray-900 dark:text-white">
                                        Welcome back to{" "}
                                        <span className="bg-gradient-to-r from-primary-500 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                                            your workspace
                                        </span>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                        Sign in to continue to your dashboard and access all features. Your work awaits.
                                    </p>
                                </div>
                            </div>

                            {/* Feature Points */}
                            <div className="space-y-4 pt-4">
                                {[
                                    "Real-time collaboration tools",
                                    "Advanced analytics dashboard",
                                    "Secure data encryption"
                                ].map((feature, index) => (
                                    <motion.div 
                                        key={feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1) }}
                                        className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                                    >
                                        <div className="h-1 w-1 rounded-full bg-primary-500" />
                                        <span className="text-sm">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Section - Form */}
                    <div className="flex flex-col justify-center">
                        <div className="md:hidden text-center mb-8">
                            <h3 className="default-heading text-4xl font-bold text-gray-900 dark:text-white">
                                Welcome Back
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                Sign in to continue to your dashboard
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="form-container space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="default-label flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Email
                                        <span className="text-red-500 text-xs">*</span>
                                    </label>
                                    <div className="relative group">
                                        <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-primary-500" />
                                        <input
                                            type="email"
                                            {...register("email", { 
                                                required: true,
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                            })}
                                            className="form-field pl-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-300/30 focus:border-primary-400 transition-all duration-200 hover:border-primary-300"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    {errors.email?.type === 'required' && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="form-field-error mt-2 flex items-center gap-1"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-red-500" />
                                            Email is required
                                        </motion.p>
                                    )}
                                    {errors.email?.type === 'pattern' && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="form-field-error mt-2 flex items-center gap-1"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-red-500" />
                                            Please enter a valid email
                                        </motion.p>
                                    )}
                                </div>

                                <div>
                                    <label className="default-label flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        Password
                                        <span className="text-red-500 text-xs">*</span>
                                    </label>
                                    <div className="relative group">
                                        <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-primary-500" />
                                        <input
                                            type="password"
                                            {...register("password", { 
                                                required: true,
                                                minLength: 6
                                            })}
                                            className="form-field pl-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-300/30 focus:border-primary-400 transition-all duration-200 hover:border-primary-300"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password?.type === 'required' && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="form-field-error mt-2 flex items-center gap-1"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-red-500" />
                                            Password is required
                                        </motion.p>
                                    )}
                                    {errors.password?.type === 'minLength' && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="form-field-error mt-2 flex items-center gap-1"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-red-500" />
                                            Password must be at least 6 characters
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            <motion.button 
                                type="submit" 
                                disabled={isLoading}
                                className="group relative default-button w-full text-base font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                                whileTap={{ scale: 0.98 }}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        Sign In
                                        <RiArrowRightLine className="text-lg opacity-70 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                )}
                            </motion.button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or continue with</span>
                                </div>
                            </div>

                            <motion.button
                                type="button"
                                onClick={() => signIn()}
                                className="group flex items-center justify-center gap-2 w-full default-button bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FcGoogle className="text-xl" />
                                <span>Sign in with Google</span>
                                <RiArrowRightLine className="text-lg opacity-0 group-hover:opacity-70 -ml-4 group-hover:ml-0 group-hover:translate-x-0.5 transition-all" />
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;