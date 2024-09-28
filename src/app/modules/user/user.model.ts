import { model, Schema } from 'mongoose';
import { TUser } from './user.types';

const UserSchema: Schema = new Schema<TUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    socialLinks: { type: Map, of: String },
    dateOfBirth: { type: Date },
    interests: { type: [String] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const User = model<TUser>('User', UserSchema);
export default User;
