export interface AuthUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface ResetUserPassword {
  email: string;
  newPassword: string;
}
