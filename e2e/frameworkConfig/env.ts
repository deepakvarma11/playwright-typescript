export class Env {
  public static readonly URL: string = process.env.URL!;
  public static readonly LOGIN_USERNAME: string = process.env.LOGIN_USERNAME!;
  public static readonly LOGIN_PASSWORD: string = process.env.LOGIN_PASSWORD!;
}
//.env file shoudl be created with url, user, pass in root dir