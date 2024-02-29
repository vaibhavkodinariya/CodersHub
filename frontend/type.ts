export interface RequestResponse {
  success: boolean;
  message?: string;
  credentials?: User;
  accessToken?: string;
  refreshToken?: string;
}
export interface SendResponse {
  email: string;
  password: string;
}
export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  type: string;
}
