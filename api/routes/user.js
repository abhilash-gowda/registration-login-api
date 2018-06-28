const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
  //checking if email exists in db already
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              fname: req.body.fname,
              fname: req.body.fname,
              lname: req.body.lname,
              weight: req.body.weight,
              height: req.body.height,
              phone: req.body.phone,
              medical_con: req.body.medical_con,
              pain_areas: req.body.pain_areas,
              medications: req.body.medications,
              experience: req.body.experience,
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "LOGIN FAILED"
        });
      }
      //comaprision with existing mails==pwd in db
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "LOGIN FAILED"
          });
        }
        if (result) {
          return res.status(200).json({
            message: "LOGIN SUCCESSFUL",
          });
        }
        res.status(401).json({
          message: "LOGIN FAILED"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
