import { Schema, InferSchemaType, model } from "mongoose";
import argon2 from "argon2";

export const TenantSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		companyName: {
			type: String,
			required: true,
		},
		companySlug: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

TenantSchema.pre("save", async function () {
	if (this.isModified("password")) {
		this.password = await argon2.hash(this.password);
		return;
	}
});

TenantSchema.index({ email: 1 }, { unique: true });
TenantSchema.index({ companySlug: 1 }, { unique: true });

export type ITenant = InferSchemaType<typeof TenantSchema>;

export const TenantModel = model<ITenant>("tenants", TenantSchema);

export default TenantModel;
