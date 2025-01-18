"use client";

import { signIn } from "@/utils/databaseFunctions";

const Login = () => {
    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            <button className="default-button" onClick={signIn}>
                Sign In with Google
            </button>
        </div>
    )
}

export default Login