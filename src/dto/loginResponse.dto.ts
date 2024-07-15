
export interface loginResponseDto {
  token: string,
  user: {
    fullName: string,
    email: string;
    isAdmin: boolean
  }
}
