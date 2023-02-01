import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema({
	id: { type: String, required: true },
	path: { type: String, default: "/" },
	userId: { type: String, required: true },
});

const name = "FileSchema";

export default mongoose.models[name] || mongoose.model(name, FileSchema, name);
