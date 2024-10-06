export type DecodedToken = {
    sub: number;
    username: string;
    email: string;
    picture: string;
    role: string;
    iat: number;
    exp: number;
  }