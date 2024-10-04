import { Schema } from 'mongoose';

type TVote = { vote: 'up' | 'down'; user: string }[];

export type TPost = {
  author: Schema.Types.ObjectId; // User reference (ObjectId)
  title: string;
  images?: string[];
  content: string;
  category: string;
  tags?: string[];
  isPremium: boolean;
  votes: TVote;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
