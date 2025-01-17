import { CommentInterface } from "./comment-interface";

export interface PostInterface {
  id: number;
  title: string;
  content: string;
  creation_date: Date;
  user: {
    name: string;
    id: number;
    profile_picture: string;
  };
  likes: [];
  comments: CommentInterface[];
}
