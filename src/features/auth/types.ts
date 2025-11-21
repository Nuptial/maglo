export type User = {
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

export type getProfileResponse = {
  success: boolean;
  message: string;
  data: User;
};

export type AuthUser = User;
