import { model, Schema, Types } from 'mongoose';
import { TComment, TReply } from './comment.types';

const ReplySchema: Schema = new Schema<TReply>(
  {
    author: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const CommentSchema: Schema = new Schema<TComment>(
  {
    post: { type: Types.ObjectId, ref: 'Post', required: true },
    author: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    replies: {type: [ReplySchema], default: []},
  },
  {
    timestamps: true,
  },
);

CommentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
CommentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Comment = model<TComment>('Comment', CommentSchema);
export default Comment;
