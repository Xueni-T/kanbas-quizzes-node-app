import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function EnrollmentsRoutes(app) {
  app.delete("/api/enrollments/:courseId/:userId", (req, res) => {
    const { courseId, userId} = req.params;
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  });
  app.put("/api/enrollments/:courseId/:userId", (req, res) => {
    const { courseId, userId } = req.params;
    enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.sendStatus(204);
  });
}