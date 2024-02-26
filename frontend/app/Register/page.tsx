import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function Register() {
    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/login.jpg')" }} >
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex-1 order-2 p-6">
                    <h4 className="font-semibold h-12 mb-2 bg-blue-100 text-center">Welcome</h4>
                    <hr />
                    <form className="grid-1 m-5">
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Institute Name</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Institute Name"
                            />
                        </div>
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Email Address</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="flex mb-2">
                            <div className="w-64 mr-8">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Contact Number</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 w-full rounded-md focus:outline-none"
                                    placeholder="Contact Number"
                                />
                            </div>
                            <div className="w-60">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">City</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 w-full rounded-md focus:outline-none"
                                    placeholder="City"
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
                                />
                            </div>
                            <div className="w-60">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Pincode</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="Pincode"
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Address</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Address"
                            />
                        </div>
                        <div className="flex mb-3">
                            <div className="w-64 mr-8">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Password</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="w-60">
                                <Label className="block text-gray-600 text-sm font-medium mb-2">Retype Password</Label>
                                <Input
                                    type="text"
                                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                    placeholder="Retype Password"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white w-full py-2 rounded-3xl hover:bg-blue-600 focus:outline-none"
                        >
                            Register
                        </Button>
                    </form>
                    <hr />
                    <div className="text-center">
                        <Label className="text-sm font-serif">Already have account?</Label>
                        <Link href={""} className="text-sm font-serif text-blue-500"> Login</Link>
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