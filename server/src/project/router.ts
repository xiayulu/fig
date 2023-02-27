import express from 'express';
import ProjectModel from "./model";

const router = express.Router();

router.get('', async (req, res, next) => {
  try {
    let result = await ProjectModel.find();
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
    let result = await ProjectModel.insertMany([req.body]);
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

router.delete("/:projectid", async (req, res, next) => {
  try {
    let result = await ProjectModel.findByIdAndDelete(req.params.projectid);
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

router.put("/:projectid", async (req, res, next) => {
  try {
    let result = await ProjectModel.findOneAndUpdate(
      { _id: req.params.projectid },
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