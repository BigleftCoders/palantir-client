export interface IUserData {
  displayName: string;
  googleId: '' | number;
  userId: string;
}

export interface IAuthState {
  userData: IUserData;
}
