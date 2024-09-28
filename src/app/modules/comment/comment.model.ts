import { model, Schema, Types } from 'mongoose';
import { TComment } from './comment.types';

const CommentSchema: Schema = new Schema<TComment>(
  {
    post: { type: Types.ObjectId, ref: 'Post', required: true },
    author: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Comment = model<TComment>('Comment', CommentSchema);
export default Comment;
