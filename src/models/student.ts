import mongoose from "mongoose";
const Schema = mongoose.Schema;

var studentSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
  },
  {
    collection: "students",
  }
);

export default mongoose.model("Student", studentSchema);
