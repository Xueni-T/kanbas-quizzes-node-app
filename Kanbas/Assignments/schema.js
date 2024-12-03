import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    points: String,
    dueDate: String,
    available: String,
    untilDate: String,
    description: String,
  },
  { collection: "assignments" }
);
export default assignmentSchema;