import { InferSchemaType, Schema, model } from "mongoose";

export const EmployeeSchema: Schema = new Schema(
	{
		employeeId: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		name: {
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

EmployeeSchema.index({ employeeId: 1 }, { unique: true });

export type IEmployee = InferSchemaType<typeof EmployeeSchema>;

export const EmployeeModel = model<IEmployee>("employees", EmployeeSchema);

export default EmployeeModel;
