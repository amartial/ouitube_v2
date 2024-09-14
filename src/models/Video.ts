import { Category } from "./Category";

export interface Video {
  _id?: number;
  title: string;
  description: string;
  poster: File | Blob | null | string;
  link: File | Blob | null | string;
  author?: string;
  isAvailable: boolean;
  category: string;
  created_at?: Date;
  updated_at?: Date;
}
