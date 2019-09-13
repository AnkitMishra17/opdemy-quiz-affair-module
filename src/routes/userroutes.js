const express = require('express');
const connection = require('../db/models');

const router = express.Router()

router.get('/', (req,res) =>{
    res.render('take-quiz');
  });
  
router.get('/take-subject-quiz', (req,res) =>{
    const sql = 'SELECT * FROM subject_quiz ORDER BY qid DESC LIMIT 5 ';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
          let answerkey = new Array();
          let questions = new Array();
          let answer1 = new Array();
          let answer2 = new Array();
          let answer3 = new Array();
          let answer4 = new Array();
          for(let i = 0; i < results.length; i++){
            answerkey[i] = results[i].answer;
            answer1[i] = results[i].optiona;
            answer2[i] = results[i].optionb;
            answer3[i] = results[i].optionc;
            answer4[i] = results[i].optiond;
            questions[i] = results[i].question;
          }
          res.render('take-subject-quiz',{answers: answerkey,optiona: answer1,optionb: answer2,optionc: answer3,optiond: answer4,question:questions});
        }    
    });
});
  
router.get('/current-affairs-quiz', (req,res) =>{
    const sql = 'SELECT * FROM current_affair_quiz ORDER BY qid DESC LIMIT 5 ';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
          let answerkey = new Array();
          let questions = new Array();
          let answer1 = new Array();
          let answer2 = new Array();
          let answer3 = new Array();
          let answer4 = new Array();
          for(let i = 0; i < results.length; i++){
            answerkey[i] = results[i].answer;
            answer1[i] = results[i].optiona;
            answer2[i] = results[i].optionb;
            answer3[i] = results[i].optionc;
            answer4[i] = results[i].optiond;
            questions[i] = results[i].question;
          }
          res.render('current-affairs-quiz',{answers: answerkey,optiona: answer1,optionb: answer2,optionc: answer3,optiond: answer4,question:questions});
        }    
    });
});

router.get('/take-subjective-quiz', (req,res) =>{
  const sql = 'SELECT * FROM quiz_subjective ORDER BY qid DESC LIMIT 5 ';
  connection.query(sql, function (error, results, fields) {
      if (error){
          throw error;
      }else{
        res.render('quiz-subjective',{data:results});
      }    
  });
});  

router.get('/current-affairs-subjective-quiz', (req,res) =>{
  const sql = 'SELECT * FROM current_affair_subjective ORDER BY qid DESC LIMIT 5 ';
  connection.query(sql, function (error, results, fields) {
      if (error){
          throw error;
      }else{
        res.render('current-affairs-subjective',{data:results});
      }    
  });
});  

module.exports = router;   