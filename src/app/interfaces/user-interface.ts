export interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: string;
  about_me?: string;
  registration_date: Date;
}
