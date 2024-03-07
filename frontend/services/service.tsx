import { SendResponse, User } from "@/type";
import { RequestResponse } from "@/type";

async function userLogin(creadentials: SendResponse): Promise<RequestResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creadentials),
        });
        const jsonResponse = await response.json()
        if (response.ok) {
            const jsonData: RequestResponse = { status: response.status, credentials: jsonResponse.details, accessToken: jsonResponse.accessToken, refreshToken: jsonResponse.refreshToken }
            return jsonData
        } else {
            return { status: response.status, message: jsonResponse.message }
        }
    } catch (e) {
        return { status: 400, message: "Something Went Wrong" }
    }
}

async function userRegister(userData: User): Promise<RequestResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const jsonResponse = await response.json()
        if (response.status == 400) {
            return { status: response.status, message: jsonResponse.message }
        } else {
            return { status: response.status, message: jsonResponse.message }
        }
    } catch (e) {
        return { status: 500, message: "Something Went Wrong" }
    }
}

export { userLogin, userRegister }
