const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const Feedback = require("../models/feedback");

router.get("/", (req, res, next) => {
    Feedback.find()
    .select("high low mid")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        feedback: docs.map(doc => {
          return {
            high: doc.high,
            low: doc.low,
            mid:doc.mid,
            _id: doc._id,
            f_time : doc._id.getTimestamp(),
            request: {
              type: "GET",
              url: "http://localhost:3000/feedback/"+ doc._id
              
            }
          };
        })
      };
      

      res.status(200).json(response);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    high: req.body.high,
    low: req.body.low,
    mid:req.body.mid
 });
  feedback
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "added successfully",
        createdFeedback: {
            high: result.high,
            mid: result.mid,
            low: result.low,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/feedback/" + result._id,
            }
            
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



router.get("/:feedbackId", (req, res, next) => {
  const id = req.params.feedbackId;
  Feedback.findById(id)
    .select('high low mid _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            feedback: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/feedback'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid feedback found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


module.exports = router;