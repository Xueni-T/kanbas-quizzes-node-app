import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const status = assignmentsDao.deleteAssignment(assignmentId);
    res.send(status);
  });
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  });
  app.post("/api/assignments", (req, res) => {
    const newAssignment = req.body;
    const assignment = assignmentsDao.createAssignment(newAssignment);
    res.json(assignment);
  });
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(cid);
    res.json(assignments);
  });
}