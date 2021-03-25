import { Schema } from 'mongoose';

export const USER_DOCUMENT = 'Users';
export const USER_COLLECTION = 'users';

export const UserSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      select: false,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      select: false,
    },
    roles: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);
