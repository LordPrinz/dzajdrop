import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema({
	id: { type: String, required: true },
	path: { type: String, default: "/" },
	name: { type: String, required: true },
	userId: { type: String, required: true },
});

const name = "FileSchema";

export default mongoose.models[name] || mongoose.model(name, FileSchema, name);
