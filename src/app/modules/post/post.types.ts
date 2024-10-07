import { Schema } from 'mongoose';

type TVote = { vote: 'up' | 'down'; user: string }[];

export type TPost = {
  author: Schema.Types.ObjectId; // User reference (ObjectId)
  title: string;
  image?: string;
  content: string;
  shortDescription: string;
  category: string;
  tags?: string[];
  isPremium: boolean;
  votes: TVote;
  isDeleted: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id?:string;
};
