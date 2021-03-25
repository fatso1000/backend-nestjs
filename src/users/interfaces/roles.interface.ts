import {Document} from "mongoose"

export interface Roles extends Document {
    readonly code: string;
    readonly status?: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}