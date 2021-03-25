import { Schema } from 'mongoose';
import { Role } from '../../auth/role/role.enum';

export const ROLE_DOCUMENT = 'Roles';
export const ROLE_COLLECTION = 'roles';

export const RolesSchema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [Role.ADMIN, Role.USER],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: true,
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
