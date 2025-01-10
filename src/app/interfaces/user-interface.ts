export interface UserInterface {
  id: number;
  name: string;
  title: string;
  email: string;
  role: string;
  about_me?: string;
  profile_picture?: string;
  registration_date: Date;
  courses: [];
  projects: [];
}
