"use client";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import Btn from "@/components/shared/Btn";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { register } from "@/services/auth/register";
import toast from "react-hot-toast";
export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(register, null);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (





        <form action={formAction} className="w-full max-w-md space-y-5 px-8 max-md:h-full">

            <h2 className="text-3xl font-semibold text-center mb-6">
                Create Your Account
            </h2>

            <Field>
                <FieldLabel htmlFor="name" className="sr-only">
                    Name
                </FieldLabel>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="name "
                    className="h-12 pr-12"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="phone" className="sr-only">
                    Phone
                </FieldLabel>
                <Input
                    id="phone"
                    name="phone"
                    type="text"
                    className="h-12 pr-12"
                    placeholder="Whatsapp Number "
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="email" className="sr-only">
                    Email
                </FieldLabel>
                <Input
                    id="email"
                    name="email"
                    type="text"
                    className="h-12 pr-12"
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
                {isPending ? "Creating..." : "Create Account"}
            </Btn>
        </form>





    );
};
