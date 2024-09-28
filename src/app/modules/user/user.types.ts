export type TUser = {
  email: string;
  password: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  isBlocked: boolean;
  socialLinks?: Record<string, string>[];
  dateOfBirth?: Date;
  interests?: string[];
  isDeleted: boolean;
};
