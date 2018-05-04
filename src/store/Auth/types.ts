export interface IUserData {
  displayName: string;
  googleId: '' | number;
  userId: string;
}

export interface IAuthState {
  isUserLoaded: boolean;
  isDoingCallback: boolean;
  userData: IUserData;
}
