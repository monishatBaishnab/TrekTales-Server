import { Schema } from 'mongoose';

export type TComment = {
  post: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  content: string;
  isDeleted: boolean;
};
