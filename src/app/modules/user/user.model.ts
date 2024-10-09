import { model, Schema } from 'mongoose';
import { TUser } from './user.types';
import bcrypt from 'bcrypt';
import config from '../../config';
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
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', default:[] }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const userData = this;
  // hashing password and save into DB
  userData.password = await bcrypt.hash(
    userData.password as string,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

UserSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
UserSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const User = model<TUser>('User', UserSchema);
export default User;
