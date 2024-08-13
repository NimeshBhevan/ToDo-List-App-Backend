const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String},
	date: { type: Date },
	done: { type: Boolean, default: false },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// create a method that returns the "_id" as "id" for easier access in frontend
todoSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

// enable the virtual id when converting the document into JSON
todoSchema.set("toJSON", {
	virtuals: true,
});

// export the model as User
const ToDo = mongoose.model("ToDo", todoSchema);
module.exports = ToDo;
