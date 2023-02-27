import express from 'express';
import Model from "./model";

const router = express.Router();

router.get('', async (req, res, next) => {
  try {
    let result = await Model.find();
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
    let result = await Model.insertMany([req.body]);
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

router.delete("/:eduid", async (req, res, next) => {
  try {
    let result = await Model.findByIdAndDelete(req.params.eduid);
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

router.put("/:eduid", async (req, res, next) => {
  try {
    let result = await Model.findOneAndUpdate(
      { _id: req.params.eduid },
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