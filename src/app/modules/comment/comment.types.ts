import { Schema } from 'mongoose';

export type TReply = {
  author: Schema.Types.ObjectId;
  content: string;
  isDeleted: boolean;
  _id?:string;
};

export type TComment = {
  post: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  content: string;
  isDeleted: boolean;
  replies?: TReply[];
};
