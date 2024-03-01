"use client"

import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { User } from "@/type";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/services/service";
import Router from "next/router";
import { Icons } from "@/components/ui/icons";

export default function Register() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmpassword, setConfirmPassword] = useState<string>('')
    const [instititeName, setInstititeName] = useState<string>('')
    const [contactNumber, setContactNumber] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [pincode, setPincode] = useState<string>('')
    const { toast } = useToast()

    const [errorMessagePassword, setErrorMessagePassword] = useState<string>('')
    const [errorMessageEmail, setErrorMessageEmail] = useState<string>('')
    const [errorContactNumber, setErrorContactNumber] = useState<string>('')
    const [errorPincode, setErrorPincode] = useState<string>('')

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        setEmail(e.target.value)
        if (!email.match(emailPattern)) {
            setErrorMessageEmail("Email Should be in appropriate Format.")
        } else {
            setErrorMessageEmail("")
        }
    }

    const onChangeContactNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setContactNumber(e.target.value)
        if (contactNumber.length > 9)
            setErrorContactNumber("Phone number should not exceed 10 digits.");
        else if (contactNumber.length < 9)
            setErrorContactNumber("Phone number must have 10 digits.");
        else if (contactNumber.length == 9)
            setErrorContactNumber("");
    }

    const onChangePincode = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setPincode(e.target.value)
        if (pincode.length > 5)
            setErrorPincode("Pincode should not exceed 6 digits.");
        else if (pincode.length < 5)
            setErrorPincode("Pincode must have 10 digits.");
        else if (pincode.length == 5)
            setErrorPincode("");
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
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

    const sendRegisteredData: User = {
        instituteName: instititeName,
        contactNumber: contactNumber,
        pincode: pincode,
        password: password,
        email: email,
        city: city,
        state: state,
        address: address
    }
    const mutation = useMutation({
        mutationFn: userRegister,
        onSuccess: (data, variables, context) => {
            if (data.success == false) {
                toast({
                    variant: "destructive",
                    description: data.message,
                })
            } else {
                Router.push('/login');
            }
        },
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!errorContactNumber && !errorMessageEmail && !errorContactNumber
            && !errorPincode && !errorMessagePassword && city && state && address) {
            if (password == confirmpassword)
                mutation.mutate(sendRegisteredData)
            else {
                toast({
                    style: { fontWeight: "bolder", fontSize: 20 },
                    variant: "destructive",
                    description: "Password and Confirm Password Must be Same",
                })
            }
        } else {
            toast({
                style: { fontWeight: "bolder", fontSize: 20 },
                variant: "destructive",
                description: "Please fill all the fields correctly.",
            })
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/login.jpg')" }} >
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex-1 order-2 p-6">
                    <h4 className="font-semibold h-12 mb-2 bg-blue-100 text-center text-xl">Welcome</h4>
                    <hr />
                    <form onSubmit={onSubmit} className="grid-1 m-5">
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Institute Name</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Institute Name"
                                name="instititeName"
                                value={instititeName}
                                disabled={mutation.isPending}
                                onChange={(e) => setInstititeName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Email Address</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                disabled={mutation.isPending}
                                onChange={onChangeEmail}
                            />
                            <div className="ml-3 mt-1" style={{ color: "red", fontSize: "12px" }}><b>{errorMessageEmail}</b></div>
                        </div>
                        <div className="flex mb-2">
                            <div className="w-64 mr-8">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Contact Number</Label>
                                <Input
                                    type="number"
                                    className="border border-gray-300 w-full rounded-md focus:outline-none"
                                    placeholder="Contact Number"
                                    name="contactNumber"
                                    value={contactNumber}
                                    disabled={mutation.isPending}
                                    onChange={onChangeContactNumber}
                                />
                                <div className="ml-3 mt-1" style={{ color: "red", fontSize: "12px" }}><b>{errorContactNumber}</b></div>
                            </div>
                            <div className="w-60">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">City</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 w-full rounded-md focus:outline-none"
                                    placeholder="City"
                                    name="city"
                                    value={city}
                                    disabled={mutation.isPending}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="w-64 mr-8">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">State</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="State"
                                    name="state"
                                    value={state}
                                    disabled={mutation.isPending}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                            <div className="w-60">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Pincode</Label>
                                <Input
                                    type="number"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="Pincode"
                                    name="pincode"
                                    value={pincode}
                                    disabled={mutation.isPending}
                                    onChange={onChangePincode}
                                />
                                <div className="ml-3 mt-1" style={{ color: "red", fontSize: "12px" }}><b>{errorPincode}</b></div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Address</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Address"
                                name="address"
                                value={address}
                                disabled={mutation.isPending}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex mb-3">
                            <div className="w-64 mr-8">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Password</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="Password"
                                    value={password}
                                    disabled={mutation.isPending}
                                    onChange={onChangePassword}
                                />
                                <div className="ml-3 mt-1" style={{ color: "red", fontSize: "12px" }}><b>{errorMessagePassword}</b></div>
                            </div>
                            <div className="w-60">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Retype Password</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="Retype Password"
                                    name="retypePassword"
                                    value={confirmpassword}
                                    disabled={mutation.isPending}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Toaster />
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white w-full py-2 rounded-3xl hover:bg-blue-600 focus:outline-none"
                        >
                            {mutation.isPending && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Register
                        </Button>
                    </form>
                    <hr />
                    <div className="text-center">
                        <Label className="text-sm font-serif">Already have account?</Label>
                        <Link href={"/Login"} className="text-sm font-serif text-blue-500"> Login</Link>
                    </div>
                </div>
                <div className="w-50 md:order-2">
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
        </ div >
    );
} 