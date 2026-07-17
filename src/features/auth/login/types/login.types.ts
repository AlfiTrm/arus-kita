export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export interface LoginResponse {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: LoginData;
}

export interface LoginJwtPayload {
  user_id: string;
  is_admin: boolean;
  role_name: string;
  exp: number;
}
