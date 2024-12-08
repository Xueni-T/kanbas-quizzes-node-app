import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId, ref: "CourseModel"
  },
  type: {
    type: String,
    enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
    default: 'Graded Quiz',
  },
  points: {
    type: Number,
  },
  assignmentGroup: {
    type: String,
    enum: ['Quizzes', 'Exams', 'Assignments', 'Project'],
    default: 'Quizzes',
  },
  shuffleAnswers: {
    type: Boolean,
    default: true,
  },
  timeLimit: {
    type: String,
    default: 20, // in minutes
  },
  multipleAttempts: {
    type: Boolean,
    default: false,
  },
  howManyAttempts: {
    type: String,
    default: 1,
  },
  showCorrectAnswers: {
    type: String,
  },
  accessCode: {
    type: String,
    default: '',
  },
  oneQuestionAtATime: {
    type: Boolean,
    default: true,
  },
  webcamRequired: {
    type: Boolean,
    default: false,
  },
  lockQuestionsAfterAnswering: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: String,
  },
  availableDate: {
    type: String,
  },
  untilDate: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  numberOfQuestions: {
    type: Number,
  },
},
  { collection: "quizzes" }
);

export default quizSchema;

