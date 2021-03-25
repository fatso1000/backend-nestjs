import {Document} from "mongoose"
import {Roles} from "./roles.interface"

export interface Users extends Document {
    readonly email: string;
    readonly username?: string;
    readonly roles: Roles[];
    readonly password?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}