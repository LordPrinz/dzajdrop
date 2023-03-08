import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema(
	{
		_id: { type: String, required: true },
		fileId: { type: String, required: true },
		clicks: { type: Number, required: true, default: 0 },
		__v: { type: Number, select: false },
	},
	{
		versionKey: false,
	}
);

const name = "FileSchema";

export default mongoose.models[name] || mongoose.model(name, FileSchema, name);
