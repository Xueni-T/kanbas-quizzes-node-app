import express from 'express'
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import QuizRoutes from './Kanbas/Quizzes/routes.js';
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

app.use(express.json());

import MongoStore from 'connect-mongo';

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/kanbas',
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
};
app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentsRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Hello(app)
Lab5(app);

app.listen(process.env.PORT || 4000);