export interface User {
  _id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
}

export enum ReferralStatus {
  NEW = 'New',
  EVALUATED = 'Evaluated',
  HIRED = 'Hired',
  REJECTED = 'Rejected'
}

export interface Referral {
  _id: string;
  name: string;
  email: string;
  experience: number;
  resumeUrl: string;
  status: ReferralStatus;
  referredBy: string;
  createdAt: string;
  updatedAt: string;
}
