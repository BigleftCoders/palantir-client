export interface IUserData {
  displayName: string;
  googleId: '' | number;
  userId: string;
  color: string;
}

export interface IAuthState {
  isUserLoaded: boolean;
  isDoingCallback: boolean;
  userData: IUserData;
}
