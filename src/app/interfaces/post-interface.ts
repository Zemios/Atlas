export interface PostInterface {
  id: number;
  user_id: number;
  title: string;
  content: string;
  creation_date: Date;
  user: {
    name: string;
    id: number;
    profile_picture: string;
  };
  likes: [];
  comments: [];
}
