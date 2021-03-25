export interface AuthUser {
  readonly _id: string;
  readonly email: string;
  readonly password: string;
}

export interface AccessToken {
  readonly access_token: string;
}
