export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}

export class AuthDto {
  username: string;
  password: string;
}
