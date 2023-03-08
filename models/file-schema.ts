import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema({
	_id: { type: String, required: true },
	full: { type: String, required: true },
	clicks: { type: Number, required: true },
});

const name = "FileSchema";

export default mongoose.models[name] || mongoose.model(name, FileSchema, name);
