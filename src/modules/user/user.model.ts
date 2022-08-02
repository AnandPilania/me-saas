import { DocumentType, getModelForClass, modelOptions, plugin, pre, prop, Severity } from "@typegoose/typegoose";
import { Schema, Types } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";
import { userServices } from "./";

@modelOptions({
	schemaOptions: {
		collection: "users",
		timestamps: true,
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
// Hash password if it is modified
@pre<User>("save", async function () {
	if (!this.isModified("password")) {
		return;
	}

	const hashed = await argon2.hash(this.password);
	this.password = hashed;

	return;
})
@plugin(passportLocalMongoose)
export class User {
	@prop({ required: true, type: Schema.Types.ObjectId })
	public _id?: Types.ObjectId;

	@prop({ required: true, unique: true, lowercase: true })
	public email: string;

	@prop({ required: true, unique: true, lowercase: true })
	public username: string;

	@prop({ required: true })
	public name: string;

	@prop({ required: true })
	public password: string;

	@prop({ required: true, default: () => uuid() })
	public verificationCode: string;

	@prop()
	public passwordResetCode: string | undefined;

	@prop({ default: false })
	public verified: boolean;

	public async validatePassword(this: DocumentType<User>, userPassword: string): Promise<boolean> {
		return await userServices.verifyUserPassword(this.password, userPassword);
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
