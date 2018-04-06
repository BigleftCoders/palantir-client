export interface IUserData {
  displayName: string;
  googleId: '' | number;
}

export interface IAuthState {
  userData: IUserData;
}

export interface IGlobalStore {
  auth: IAuthState;
}
