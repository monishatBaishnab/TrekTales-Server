import mongoose, { Schema } from 'mongoose';
import { TPost } from './post.types';

const VoteSchema: Schema = new Schema(
  {
    vote: { type: String, enum: ['up', 'down'], required: true },
    user: { type: String, required: true },
  },
  { _id: false },
);

const PostSchema: Schema = new Schema<TPost>(
  {
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    shortDescription: {type:String, required:true},
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPremium: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    votes: { type: [VoteSchema], required: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model<TPost>('Post', PostSchema);
export default Post;
