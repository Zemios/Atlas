export interface UserInterface {
  id: number;
  name: string;
  title: string;
  email: string;
  role: string;
  about_me?: string;
  registration_date: Date;
  courses: [];
  projects: [];
}
