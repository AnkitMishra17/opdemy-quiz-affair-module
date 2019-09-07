const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = require('../db/models');

const router = express.Router()

router.get('/', (req,res) =>{
    res.render('./login');
  });

router.post('/', (req,res) =>{
    let {username, password} = req.body;
    connection.query('SELECT * FROM admin WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            bcrypt.compare(password, results[0].password, function(err, ress) {
                if(!ress){
                    res.json({
                      status:false,                  
                      message:"username and password does not match"
                    });
                }else{   
                  req.session.loggedin = true;
                  req.session.username = username;
                  res.redirect('/admin-login/dashboard');
                }
            });         
        }
        else{
          res.json({
              status:false,
            message:"Username does not exists"
          });
        }
      }
    });
});
   
router.get('/dashboard', (req,res) =>{
        isloggedin(req,res,'dashboard');
});
  
router.get('/dashboard/add-quiz', (req,res) =>{
    isloggedin(req,res,'add-quiz');
});
  
router.get('/dashboard/add-current-affairs', (req,res) =>{
    isloggedin(req,res,'add-current-affairs');
});

isloggedin = (req,res,page) => {
    if (req.session.loggedin) {
      res.render(page);
  } else {
    res.redirect('/admin-login');
  }
};

router.post('/dashboard/add-quiz', (req,res) =>{
    const {question, optionA, optionB, optionC, optionD, answer} = req.body;
    const sql = "INSERT INTO subject_quiz (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/admin-login/dashboard/add-quiz');
    });
  });
  
router.post('/dashboard/add-current-affairs', (req,res) =>{
    const {question, optionA, optionB, optionC, optionD, answer} = req.body;
    const sql = "INSERT INTO current_affair_quiz (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/admin-login/dashboard/add-current-affairs');
    });
  });

  
router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/admin-login');
        }
      });
    }
  });
  
module.exports = router;  