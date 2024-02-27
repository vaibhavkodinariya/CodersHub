import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/login.jpg')" }} >
            <div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col sm:flex-row" >
                <div className="flex-1 mt-16 mb-16 p-6">
                    <h4 className="font-medium border-blue-200 border-b-2 text-lg mb-2 text-center h-12 bg-blue-100">Reset Password</h4>
                    <form className="m-5 grid">
                        <div className="mb-2">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Enter New Password</Label>
                            <Input
                                type="text"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Enter New Password"
                            />
                        </div>
                        <div className="mb-4">
                            <Label className="block text-gray-600 text-sm font-medium mb-2">Confirm New Password</Label>
                            <Input
                                type="password"
                                className="border border-gray-300 p-2 w-full rounded-md focus:outline-none"
                                placeholder="Confirm New Password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white text-xs w-32 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                        >
                            Change Password
                        </Button>
                    </form>
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
        </ div >
    );
} 