import { Schema } from "mongoose";

export type TPost = {
  author: Schema.Types.ObjectId; // User reference (ObjectId)
  title: string;
  images?: string[];
  content: string;
  category: string;
  tags?: string[];
  isPremium: boolean;
  upvotes: number;
  downvotes: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
