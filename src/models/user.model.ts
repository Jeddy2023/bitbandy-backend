import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    password: string;
    email: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true })

export const User = mongoose.model<IUser>("User", UserSchema);