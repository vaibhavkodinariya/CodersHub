import { SendResponse, User } from "@/type";
import { RequestResponse } from "@/type";

async function userLogin(creadentials: SendResponse): Promise<RequestResponse> {
    try {
        const response = await fetch(`${process.env.API_URL}${process.env.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creadentials),
        });
        const jsonResponse = await response.json()
        if (response.ok) {
            const jsonData: RequestResponse = { success: jsonResponse.success, credentials: jsonResponse.details, accessToken: jsonResponse.accessToken, refreshToken: jsonResponse.refreshToken }
            return jsonData
        } else {
            return { success: jsonResponse.success, message: jsonResponse.message }
        }
    } catch (e) {
        return { success: false, message: "Something Went Wrong" }
    }
}

async function userRegister(userData: User): Promise<RequestResponse> {
    try {
        console.log(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REGISTER}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const jsonResponse = await response.json()
        if (response.status == 201) {
            const jsonData: RequestResponse = { success: jsonResponse.success, message: jsonResponse.message }
            return jsonData
        } else {
            return { success: jsonResponse.success, message: jsonResponse.message }
        }
    } catch (e) {
        console.log("ERROR Code", e)
        return { success: false, message: "Something Went Wrong" }
    }
}

export { userLogin, userRegister }
