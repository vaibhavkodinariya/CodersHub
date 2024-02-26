import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/login.jpg')" }} >
            < div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col sm:flex-row" >
                <div className="flex-1 p-6">
                    <h4 className="font-semibold mb-6 text-center">Welcome to CodersHub</h4>
                    <hr />
                    <br />
                    <form className="grid gap-1">
                        <div className="mb-4">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Email address</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="mb-4">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Password</Label>
                            <Input
                                type="password"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Enter Password"
                            />
                        </div>
                        <div>
                            <Checkbox className="float-start mr-2" /><Label className="text-sm font-serif float-left">Keep me logged in</Label> <Link href={""} className="text-sm font-serif float-end">Forgot password?</Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Login
                        </button>
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
            </div >
        </ div >
    );
} 