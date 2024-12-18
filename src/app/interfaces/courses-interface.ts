export interface CoursesInterface {
  id: number;
  title: string;
  content: {
    modules: string[];
  };
  creation_date: Date;
}
