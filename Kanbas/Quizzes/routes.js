import * as quizzesDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";
export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDao.deleteQuiz(quizId);
    res.send(status);
  });
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });
  app.post("/api/quizzes", async (req, res) => {
    const newQuiz = req.body;
    const quiz = await quizzesDao.createQuiz(newQuiz);
    res.json(quiz);
  });
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const quizzes = await quizzesDao.findQuizzesForCourse(cid);
    res.json(quizzes);
  });
  // findQuestionsForQuiz
  app.get("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const questions = await questionsDao.findQuestionsForQuiz(qid);
    res.json(questions);
  });
  // createQuestion
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const { qid } = req.params;
    const question = {
      ...req.body,
      quiz: qid,
    };
    const newQuestion = await questionsDao.createQuestion(question);
    res.send(newQuestion);
  });
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);
    res.send(quiz);
  });
}