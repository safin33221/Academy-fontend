"use client";

import Btn from "@/components/shared/Btn";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    FaGoogle,
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaUser,
    FaLock,
    FaEnvelope,
} from "react-icons/fa";

export default function AuthAnimation() {
    const [active, setActive] = useState(false);

    return (
        <div className=" flex md:min-h-screen items-center justify-center bg-linear-to-r from-gray-200 to-indigo-200">

            <div className="w-full  max-w-6xl bg-white shadow-2xl overflow-hidden">

                {/* ================= DESKTOP VERSION ================= */}
                <div className="relative hidden md:block h-[70vh]">

                    {/* FORMS */}
                    <div
                        className={`absolute inset-0 w-[200%] flex transition-transform duration-700 ease-in-out ${active ? "-translate-x-1/2" : "translate-x-0"
                            }`}
                    >
                        <div className="w-1/2 flex items-center justify-end">
                            <AuthForm title="Login" buttonText="Login" />
                        </div>

                        <div className="w-1/2 flex items-center justify-start">
                            <AuthForm
                                title="Register"
                                buttonText="Register"
                                showEmail
                                showPhone
                            />
                        </div>
                    </div>

                    {/* OVERLAY */}
                    <div
                        className={`absolute top-0 left-0 w-1/2 h-full
          bg-linear-to-r from-primary to-blue-600 
          text-white flex items-center justify-center
          transition-transform duration-700 ease-in-out z-20
          ${active
                                ? "translate-x-full rounded-l-[200px]"
                                : "translate-x-0 rounded-r-[200px]"
                            }`}
                    >
                        <OverlayContent
                            title={active ? "Welcome Back!" : "Hello, Welcome!"}
                            text={
                                active
                                    ? "Already have an account?"
                                    : "Don't have an account?"
                            }
                            button={active ? "Sign In" : "Register"}

                            onClick={() => setActive(!active)}
                        />

                    </div>
                </div>

                {/* ================= MOBILE VERSION ================= */}
                <div className="md:hidden flex flex-col">

                    {/* BLUE TOP SECTION */}
                    <div className="bg-linear-to-r from-primary to-blue-600 transition duration-300 text-white text-center py-12 px-6 rounded-b-[100px] ">
                        <h1 className="text-3xl font-bold mb-3">
                            {active ? "Welcome Back!" : "Hello, Welcome!"}
                        </h1>
                        <p className="mb-4 text-sm">
                            {active
                                ? "Already have an account?"
                                : "Don't have an account?"}
                        </p>
                        <Btn
                            onClick={() => setActive(!active)}

                        >
                            {active ? "Sign In" : "Register"}
                        </Btn>

                    </div>

                    {/* FORM BELOW */}
                    <div className="py-10 h-full">
                        {!active ? (
                            <AuthForm title="Login" buttonText="Login" />
                        ) : (
                            <AuthForm
                                title="Register"
                                buttonText="Register"
                                showEmail
                                showPhone
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

/* ================= OVERLAY ================= */

function OverlayContent({
    title,
    text,
    button,
    onClick,
}: {
    title: string;
    text: string;
    button: string;
    onClick: () => void;
}) {
    return (
        <div className="text-center px-12">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="mb-6 text-sm">{text}</p>
            <Btn
                onClick={onClick}
                className="border border-white px-8 py-2 rounded-lg hover:bg-white "
            >
                {button}
            </Btn>
            <Link className="" href={`/`}>
                <Btn

                    className="mt-6 "



                >
                    <ArrowLeft /> Back Home
                </Btn>
            </Link>
        </div >
    );
}

/* ================= FORM ================= */

function AuthForm({
    title,
    buttonText,
    showEmail,
    showPhone
}: {
    title: string;
    buttonText: string;
    showEmail?: boolean;
    showPhone?: boolean;
}) {
    return (
        <form className="w-full max-w-md text-center px-10">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>

            <Input icon={<FaUser />} placeholder="Username" />
            {showPhone && (
                <Input icon={<FaEnvelope />} placeholder="Your Phone Numbe" type="text" />
            )}

            {showEmail && (
                <Input icon={<FaEnvelope />} placeholder="Email" type="email" />
            )}


            <Input icon={<FaLock />} placeholder="Password" type="password" />

            {title === "Login" && (
                <div className="text-right text-sm mb-3">
                    <a href="#" className="text-gray-600">
                        Forgot Password?
                    </a>
                </div>
            )}

            <Btn className="w-full h-12 bg-indigo-500 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition">
                {buttonText}
            </Btn>

            <p className="my-4 text-sm">
                or {buttonText.toLowerCase()} with social platforms
            </p>

            <div className="flex justify-center gap-4">
                <Social icon={<FaGoogle />} />
                <Social icon={<FaFacebookF />} />
                <Social icon={<FaGithub />} />
                <Social icon={<FaLinkedinIn />} />
            </div>
        </form >
    );
}

function Input({
    icon,
    placeholder,
    type = "text",
}: {
    icon: React.ReactNode;
    placeholder: string;
    type?: string;
}) {
    return (
        <div className="relative my-4">
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-gray-100 px-4 py-3 pr-12 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                {icon}
            </span>
        </div>
    );
}

function Social({ icon }: { icon: React.ReactNode }) {
    return (
        <div className="border border-gray-300 p-3 rounded-lg text-xl cursor-pointer hover:bg-gray-100 transition">
            {icon}
        </div>
    );
}