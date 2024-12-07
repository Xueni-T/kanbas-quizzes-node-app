import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    questionType: String,
    title: String,
    points: Number,
    questionText: String,
    choicesAnswers: [String],
    correctAnswers: [String],
  },
  { collection: "questions" }
);
export default questionSchema;