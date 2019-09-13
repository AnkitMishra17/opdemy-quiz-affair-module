const express = require('express');
const connection = require('../db/models');

const router = express.Router()

router.get('/', (req,res) =>{
    res.render('./login');
  });

router.post('/', (req,res) =>{
    let {username, password} = req.body;
    if (username && password) {
      connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/admin-login/dashboard');
        } else {
          res.send('Incorrect Username and/or Password!');
        }			
        res.end();
      });
    } else {
      res.send('Please enter Username and Password!');
      res.end();
    }
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

router.get('/dashboard/add-quiz-subjective', (req,res) =>{
  isloggedin(req,res,'add-quiz-subjective');
});

router.get('/dashboard/add-current-affairs-subjective', (req,res) =>{
  isloggedin(req,res,'add-current-affairs-subjective');
});

isloggedin = (req,res,page) => {
    if (req.session.loggedin) {
      res.render(page);
  } else {
    res.redirect('/admin-login');
  }
};

router.post('/dashboard/add-quiz', (req,res) =>{
    let {question, optionA, optionB, optionC, optionD, answer} = req.body;
    
    question = question.replace(/\,/g,"@");
    question = question.replace(/\'/g,"$");
    question = question.replace(/\`/g,"#");
    question = question.replace(/\’/g,"^");
    optionA = optionA.replace(/\,/g,"@");
    optionB = optionB.replace(/\,/g,"@");
    optionC = optionC.replace(/\,/g,"@");
    optionD = optionD.replace(/\,/g,"@");
    
    const sql = "INSERT INTO subject_quiz (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/admin-login/dashboard/add-quiz');
    });
  });
  
router.post('/dashboard/add-current-affairs', (req,res) =>{
    let {question, optionA, optionB, optionC, optionD, answer} = req.body;
    
    question = question.replace(/\,/g,"@");
    question = question.replace(/\'/g,"$");
    question = question.replace(/\`/g,"#");
    question = question.replace(/\’/g,"^");
    optionA = optionA.replace(/\,/g,"@");
    optionB = optionB.replace(/\,/g,"@");
    optionC = optionC.replace(/\,/g,"@");
    optionD = optionD.replace(/\,/g,"@");
    
    const sql = "INSERT INTO current_affair_quiz (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/admin-login/dashboard/add-current-affairs');
    });
  });

router.post('/dashboard/add-quiz-subjective', (req,res) =>{
    const {question} = req.body;
    const sql = "INSERT INTO quiz_subjective (question) VALUES ('"+ question +"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/admin-login/dashboard/add-quiz-subjective');
    });
  });

router.post('/dashboard/add-current-affairs-subjective', (req,res) =>{
    const {question} = req.body;
    const sql = "INSERT INTO current_affair_subjective (question) VALUES ('"+ question +"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.redirect('/admin-login/dashboard/add-current-affairs-subjective');
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