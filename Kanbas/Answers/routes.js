import * as answersDao from "./dao.js";
export default function AnswerRoutes(app) {
  app.get("/api/quizzes/:quizId/answers", async (req, res) => {
    const { quizId } = req.params;
    const answers = await answersDao.findAnswersForQuiz(quizId);
    res.send(answers);
  });
  app.post("/api/quizzes/:quizId/answers", async (req, res) => {
    const { quizId } = req.params;
    const newAnswer = req.body;
    const status = await answersDao.createAnswer(quizId, newAnswer);
    res.send(status);
  });
  app.get("/api/answers/:answerId", async (req, res) => {
    const { questionId } = req.params;
    const questionUpdates = req.body;
    const status = await answersDao.updateQuestion(questionId, questionUpdates);
    res.send(status);
  });
  app.put("/api/quizzes/:quizId/user/:userId/answers/update", async (req, res) => {
    const { quizId, userId } = req.params;
    console.log(req.body);
    const { updateAnswer } = req.body;
    console.log(updateAnswer);
    const status = await answersDao.updateAnswer(quizId, userId, updateAnswer);
    res.send(status);
  });
  app.put("/quizzes/:qid/updateScore", async (req, res) => {
    const { qid } = req.params;
    const { userId, score } = req.body;
    try {
      const answer = await Answer.findOne({ quizId: qid, userId });

      if (!answer) {
        return res.status(404).json({ error: "Answer record not found" });
      }
      answer.score = score;
      await answer.save();

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating quiz score:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.post("/quizzes/:qid/calculateScore", async (req, res) => {
    const { qid } = req.params;
    const { userId } = req.body;

    try {
      const quiz = await Quiz.findById(qid);
      const userAnswers = await Answer.findOne({ quizId: qid, userId });

      if (!quiz || !userAnswers) {
        return res.status(404).json({ error: "Quiz or answers not found" });
      }

      let score = 0;
      for (const question of quiz.questions) {
        const userAnswer = userAnswers.answers.find(
          (ans) => ans.questionId.toString() === question._id.toString()
        );
        if (userAnswer && userAnswer.updateAnswer === question.correctAnswer) {
          score += question.points || 0;
        }
      }

      res.json({ score });
    } catch (error) {
      console.error("Error calculating score:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.put("/api/quizzes/:quizId/user/:userId/answers/finished", async (req, res) => {
    const { quizId, userId } = req.params;
    const status = await answersDao.addAttempt(quizId, userId);
    res.send(status);
  });
  app.put("/api/quizzes/:quizId/user/:userId/answer", async (req, res) => {
    const { quizId, userId } = req.params;
    const { questionId, updateAnswer } = req.body;
    const status = await answersDao.addAnswerToMap(quizId, userId, questionId, updateAnswer);
    res.send(status);
  });
  app.get("/api/quizzes/:quizId/user/:userId/answers", async (req, res) => {
    const { quizId, userId } = req.params;
    const status = await answersDao.findAnswersForUser(quizId, userId);
    res.send(status);
  });

  app.post("/api/quizzes/:quizId/user/:userId/answers", async (req, res) => {
    const { quizId, userId } = req.params;
    const status = await answersDao.newAttempt(quizId, userId);
    res.send(status);
  });
}