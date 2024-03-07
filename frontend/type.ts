export interface RequestResponse {
  status: number;
  message?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}
export interface SendResponse {
  email: string;
  password: string;
}
export interface User {
  id?: number;
  instituteName?: string;
  email?: string;
  contactNumber?: string;
  state?: string;
  city?: string;
  pincode?: string;
  address?: string;
  password?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  type?: string;
}
