import { DocumentType, getModelForClass, modelOptions, pre, prop, Severity } from "@typegoose/typegoose";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";
import { log } from "../../providers";

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
export class User {
	@prop({ required: true, unique: true, lowercase: true })
	public email: string;

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
		try {
			return await argon2.verify(this.password, userPassword);
		} catch (error) {
			log.error(error, "Could not verify password");
			return false;
		}
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
