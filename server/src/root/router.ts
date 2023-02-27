// src/routes/index.ts
import { Request, Response } from 'express'
import express from 'express'
const router = express.Router();

router.get('/', (req: Request, res: Response) => res.status(200).send('Hello Shinp!!!'))

export default router;
