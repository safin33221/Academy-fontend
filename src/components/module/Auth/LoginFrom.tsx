"use client"
import { useActionState, useEffect, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { login } from "@/services/auth/login";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Btn from "@/components/shared/Btn";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(login, null);

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="relative w-full max-w-md space-y-5 px-8 max-md:h-full">

            <h2 className="text-3xl font-semibold text-center mb-6">
                Sign In
            </h2>

            <Field>
                <FieldLabel htmlFor="email" className="sr-only">
                    Email
                </FieldLabel>
                <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email address"
                />
            </Field>

            <Field>
                <FieldLabel htmlFor="password" className="sr-only">
                    Password
                </FieldLabel>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="h-12 pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </Field>

            <div className="text-right text-sm">
                <Link href="#" className="text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>

            <Btn
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPending}
            >
                {isPending ? "Logging in..." : "Login"}
            </Btn>
        </form>
    );
}
