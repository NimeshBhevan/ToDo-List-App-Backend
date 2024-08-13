const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, unique: true },
});

// create a method that returns the "_id" as "id" for easier access in frontend
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// enable the virtual id when converting the document into JSON
userSchema.set("toJSON", {
  virtuals: true,
});

// export the model as User
const User = mongoose.model("User", userSchema);
module.exports = User;
