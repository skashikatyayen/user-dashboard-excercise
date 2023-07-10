export interface UserData {
    message?: string;
    username?: string;
    role?: string;
    token?: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }