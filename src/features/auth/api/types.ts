type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
};

type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
  };
};

type LogoutResponse = {
  success: boolean;
  message: string;
};

type RefreshTokenResult = {
  accessToken: string;
};

type GetProfileResponse = {
  success: boolean;
  message: string;
  data: User;
};

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LogoutResponse,
  RefreshTokenResult,
  GetProfileResponse,
  User,
};

