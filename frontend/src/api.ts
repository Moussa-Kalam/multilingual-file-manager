export interface FileDto {
  id: string;
  name: string;
  size: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
}

export interface UserDTO{
  email: string,
  password: string,
  confirmPassword: string
}

export interface User {
  id: string;
  email: string;
  password: string;
  token?: string;
}