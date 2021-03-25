import { Schema } from 'mongoose';

export const APIKEY_DOCUMENT = 'ApiKey';
export const APIKEY_COLLECTION = 'api_keys';

export const ApiKeySchema = new Schema(
  {
    key: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      maxlength: 1024,
    },
    version: {
      type: Schema.Types.Number,
      required: true,
      min: 1,
      max: 100,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);
