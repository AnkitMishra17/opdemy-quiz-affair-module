const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
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
          }
          res.render('take-subject-quiz',{data: results,answers: answerkey,optiona: answer1,optionb: answer2,optionc: answer3,optiond: answer4});
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
          }
          res.render('current-affairs-quiz',{data: results,answers: answerkey,optiona: answer1,optionb: answer2,optionc: answer3,optiond: answer4});
        }    
    });
});
  
module.exports = router;   