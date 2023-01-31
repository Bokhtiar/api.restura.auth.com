import { Schema, model } from 'mongoose'
import { IUserCreateUpdate } from '../../types/user/user.types'

const userSchema = new Schema<IUserCreateUpdate>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: false,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            default: "user",
        }
    }, {
    timestamps: true
}
);

export const User = model<IUserCreateUpdate>("User", userSchema);
