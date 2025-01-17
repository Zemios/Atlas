// Definición de CommentInterface
export interface CommentInterface {
  id: number;
  content: string;
  creation_date: Date;
  user: {
    id: number;
    name: string;
    profile_picture: string;
  };
}
