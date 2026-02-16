"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Btn from "@/components/shared/Btn";
import { LoginForm } from "./LoginFrom";
import RegisterForm from "./RegisterFrom";
import Logo from "@/components/shared/Logo";

export default function AuthPage() {
    const [active, setActive] = useState(false);

    return (
        <div className="min-h-screen bg-linear-to-r from-gray-200 to-gray-100 flex items-center justify-center ">
            <div className="w-full max-w-6xl bg-white shadow-2xl overflow-hidden ">

                {/* ================= DESKTOP ================= */}
                <div className="relative hidden md:block h-[80vh]">

                    {/* LOGO SMOOTH MOVE */}
                    <div
                        className={`absolute -top-20 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${active ? "left-8" : "right-8"}`}
                    >
                        <Logo size={180} />
                    </div>

                    {/* SLIDER */}
                    <div
                        className={`absolute inset-0 w-[200%] flex
            transition-transform duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            will-change-transform
            ${active ? "-translate-x-1/2" : "translate-x-0"}`}
                    >
                        <div className="w-1/2 flex items-center justify-end pr-20">
                            <LoginForm />
                        </div>

                        <div className="w-1/2 flex items-center justify-start pl-20">
                            <RegisterForm />
                        </div>
                    </div>

                    {/* OVERLAY */}
                    <div
                        className={`absolute top-0 left-0 w-1/2 h-full
            bg-linear-to-r from-primary to-blue-600
            text-white flex items-center justify-center
            transition-all duration-800
            ease-[cubic-bezier(0.22,1,0.36,1)]
            will-change-transform z-20
            ${active
                                ? "translate-x-full rounded-l-[200px]"
                                : "translate-x-0 rounded-r-[200px]"
                            }`}
                    >
                        <div className="text-center px-12 transition-opacity duration-500">
                            <h1 className="text-4xl font-bold mb-4">
                                {active ? "Welcome Back!" : "Hello, Welcome!"}
                            </h1>

                            <p className="mb-6 text-sm opacity-90">
                                {active
                                    ? "Already have an account?"
                                    : "Don't have an account?"}
                            </p>

                            <Btn
                                onClick={() => setActive(!active)}
                                className="border border-white px-8 py-2"
                            >
                                {active ? "Sign In" : "Register"}
                            </Btn>

                            <Link href="/" className="block mt-6">
                                <Btn className="bg-white text-white hover:bg-gray-100">
                                    <ArrowLeft size={16} className="mr-2" />
                                    Home
                                </Btn>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ================= MOBILE ================= */}
                <div className="md:hidden flex flex-col min-h-screen">

                    <div className="bg-linear-to-r from-primary to-blue-600
          text-white text-center pt-14 pb-16 px-6
          rounded-b-[120px] shadow-lg
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">

                        <h1 className="text-3xl font-bold mb-3">
                            {active ? "Welcome Back!" : "Hello, Welcome!"}
                        </h1>

                        <p className="mb-5 text-sm opacity-90">
                            {active
                                ? "Already have an account?"
                                : "Don't have an account?"}
                        </p>

                        <div className="flex gap-3 items-center justify-center">
                            <Btn
                                onClick={() => setActive(!active)}
                                className=" mb-1.5 w-1/2"
                            >
                                {active ? "Sign In" : "Register"}
                            </Btn>
                            <Link href="/" className=" w-1/2">
                                <Btn className="   ">
                                    <ArrowLeft size={16} className="mr-2" />
                                    Home
                                </Btn>
                            </Link>
                        </div>

                    </div>

                    <div className="px-6 py-10 bg-white transition-opacity duration-500">
                        {active ? <RegisterForm /> : <LoginForm />}
                    </div>
                </div>
            </div>
        </div >
    );
}