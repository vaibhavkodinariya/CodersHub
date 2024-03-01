import { SendResponse } from "@/type";
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

export { userLogin }
