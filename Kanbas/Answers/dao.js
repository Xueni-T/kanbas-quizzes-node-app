import { findQuestionsForQuiz } from "../Questions/dao.js";
import model from "./model.js";
import quizModel from "../Quizzes/model.js";
export async function findAnswersForQuiz(quizId) {
  return model.find({ quiz: quizId, finished: true });
}
export async function findAnswersForUser(quizId, userId) {
  return model.findOne({ quiz: quizId, user: userId });
}
export async function createAnswer(quizId, answer) {
  return model.create({ quizId: quizId, attempt: 1, finished: false, ...answer });
}
export async function deleteAnswer(answerId) {
  return model.deleteOne({ _id: answerId });
}