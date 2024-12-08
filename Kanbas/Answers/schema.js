import mongoose from "mongoose";
const answerSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    attemptDate: { type: Date, default: Date.now },
    score: Number,
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" },
        answer: String,
      },
    ],
  },
  { collection: "answers" }
);
export default answerSchema;