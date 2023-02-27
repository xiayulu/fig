import cors from 'cors';
import express from 'express'
import logger from "./logger";
import morgan from 'morgan';
import connectDB from './db';

import root from './root/router';
import job from "./job/router";
import project from "./project/router";
import employee from "./employee/router";
import edu from "./edu/router";

const app = express()
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", root);
app.use("/jobs", job);
app.use("/projects", project);
app.use("/employees", employee);
app.use("/edus", edu);


const PORT = 3003;
app.listen(PORT, async () => {
  await connectDB();
  logger.info(`App is running at http://localhost:${PORT}`)
})