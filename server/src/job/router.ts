import express from 'express';
import JobModel from "./model";

const router = express.Router();

router.get('', async (req, res, next) => {
  try {
    let result = await JobModel.find();
    res.json({
      code: 0,
      msg: "ok",
      data: result,
    })
  } catch (err) {
    res.json({
      code: -1,
      msg: err,
      data: null,
    })
  }
});

router.post("", async (req, res, next) => {
  try {
    let result = await JobModel.insertMany([req.body]);
    res.json({
      code: 0,
      msg: "ok",
      data: result,
    })
  } catch (err) {
    res.json({
      code: -1,
      msg: err,
      data: null,
    })
  }
})

router.delete("/:jobid", async (req, res, next) => {
  try {
    let result = await JobModel.findByIdAndDelete(req.params.jobid);
    res.json({
      code: 0,
      msg: "ok",
      data: result,
    })
  } catch (err) {
    res.json({
      code: -1,
      msg: err,
      data: null,
    })
  }
});

router.put("/:jobid", async (req, res, next) => {
  try {
    let result = await JobModel.findOneAndUpdate(
      { _id: req.params.jobid },
      req.body,
      { upsert: true }
    );
    res.json({
      code: 0,
      msg: "ok",
      data: result,
    })
  } catch (err) {
    res.json({
      code: -1,
      msg: err,
      data: null,
    })
  }
})

export default router;