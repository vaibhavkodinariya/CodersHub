"use client"

import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SendResponse } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/services/service";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "@/components/ui/icons";

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessagePassword, setErrorMessagePassword] = useState<string>('')
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>('')
    const { toast } = useToast()
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        setEmail(e.target.value)
        if (!email.match(emailPattern)) {
            setErrorMessageEmail("Email Should be in appropriate Format.")
        } else {
            setErrorMessageEmail("")
        }
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const specialSymbols = /[^A-Za-z 0-9]/g;
        if (!password.match(lowerCase)) {
            setErrorMessagePassword("Password must contains atleast one lowercase letter.");
        } else if (!password.match(upperCase)) {
            setErrorMessagePassword("Password must contains atleast one uppercase letter.");
        } else if (!password.match(numbers)) {
            setErrorMessagePassword("Password must contains atleast one digit.");
        } else if (password.length <= 8) {
            setErrorMessagePassword("Password must be minimum 8 characters long.");
        } else if (!password.match(specialSymbols)) {
            setErrorMessagePassword("Password must contains atleast one special character.");
        } else {
            setErrorMessagePassword('')
        }
    }

    const mutation = useMutation({
        mutationFn: userLogin,
        onSuccess: (data, variables, context) => {
            if (data.success == false) {
                toast({
                    variant: "destructive",
                    description: data.message,
                })
            } else {
                // @todo set localstorage
            }
        },
    })

    const sendData: SendResponse = {
        email, password
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        if (!email && !password) {
            setErrorMessagePassword("Email or Password must not be Empty.")
        } else {
            if (!errorMessageEmail && !errorMessagePassword)
                mutation.mutate(sendData)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/login.jpg')" }} >
            <div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col sm:flex-row" >
                <div className="flex-1 p-6 mb-14 mt-14">
                    <h4 className="font-semibold mb-6 text-center">Welcome to CodersHub</h4>
                    <hr />
                    <br />
                    <form onSubmit={onSubmit} className="grid gap-1">
                        <div className="mb-4">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Email address</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Enter Email"
                                value={email}
                                onChange={onChangeEmail}
                                disabled={mutation.isPending}
                            />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}><b>{errorMessageEmail}</b></div>
                        <div className="mb-4">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Password</Label>
                            <Input
                                type="password"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Enter Password"
                                value={password}
                                onChange={onChangePassword}
                                autoCapitalize="none"
                                disabled={mutation.isPending}
                            />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}> <b>{errorMessagePassword}</b></div>
                        <div>
                            <Checkbox className="float-start mr-2" /><Label className="text-sm font-serif float-left">Keep me logged in</Label> <Link href={""} className="text-sm font-serif float-end">Forgot password?</Link>
                        </div>
                        <Toaster />
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            {mutation.isPending && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>
                    </form>
                    <hr />
                    <div className="text-center">
                        <Label className="text-sm font-serif">Your Organisation not Registered?</Label> <Link href={""} className="text-sm font-serif text-blue-500">Register Organisation</Link>
                    </div>
                </div>
                <div className="flex-1 order-1 sm:order-2">
                    <Image
                        priority={true}
                        src="/login.jpg"
                        width={500}
                        height={500}
                        alt="Login Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
} 