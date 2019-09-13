const express = require('express');
const connection = require('../db/models');

const router = express.Router();

router.get('/', (req,res) =>{
        res.render('take-past-quiz');
  });

  router.get('/take-subject-quiz', (req,res) =>{
    const sql = 'SELECT Date FROM subject_quiz GROUP BY DATE(Date) ORDER BY Date ';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
          console.log(results);
          let array = new Array();
          for(let i=0; i< results.length; i++){
            array[i] = results[i].Date.toDateString();
            array[i] = array[i].split(",");
          }
          // var demodate = results[0].Date.toDateString();
          // demodate = demodate.split(" ");
          res.render('past-questions',{output: array,title:'Past Static Syllabus Quizzes',id:'1'});
        }    
    });

});
  
router.get('/current-affairs-quiz', (req,res) =>{
    const sql = 'SELECT Date FROM current_affair_quiz GROUP BY DATE(Date) ORDER BY Date ';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
          console.log(results);
          let array = new Array();
          for(let i=0; i< results.length; i++){
            array[i] = results[i].Date.toDateString();
            array[i] = array[i].split(",");
          }
          // var demodate = results[0].Date.toDateString();
          // demodate = demodate.split(" ");
          res.render('past-questions',{output: array,title:'Past Current Affair Quizzes',id:'2'});
        }    
    });
});

router.get('/take-subjective-quiz', (req,res) =>{
    const sql = 'SELECT Date FROM quiz_subjective GROUP BY DATE(Date) ORDER BY Date ';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
          console.log(results);
          let array = new Array();
          for(let i=0; i< results.length; i++){
            array[i] = results[i].Date.toDateString();
            array[i] = array[i].split(",");
          }
          // var demodate = results[0].Date.toDateString();
          // demodate = demodate.split(" ");
          res.render('past-questions',{output: array,title:'Past GS Mains Questions',id:'3'});
        }    
    });
});  

router.get('/current-affairs-subjective-quiz', (req,res) =>{
    const sql = 'SELECT Date FROM current_affair_subjective GROUP BY DATE(Date) ORDER BY Date ';
    connection.query(sql, function (error, results, fields) {
        if (error){
            throw error;
        }else{
          console.log(results);
          let array = new Array();
          for(let i=0; i< results.length; i++){
            array[i] = results[i].Date.toDateString();
            array[i] = array[i].split(",");
          }
          // var demodate = results[0].Date.toDateString();
          // demodate = demodate.split(" ");
          res.render('past-questions',{output: array,title:'Past Current Affairs',id:'4'});
        }    
    });
});  
  


router.get('/past/', (req,res) =>{
      
      function getMonthFromString(mon){
        return new Date(Date.parse(mon +" 11, 1111")).getMonth()+1
      }
      let month = getMonthFromString(req.query.month);
      let date = req.query.date;
      let year = req.query.year;
      console.log(date);
      
      const sql = 'SELECT * FROM current_affair_quiz WHERE MONTH(Date) = ? AND YEAR(Date) = ? AND DAY(Date) = ?';
      connection.query(sql,[month, year, date], function (error, results, fields) {
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
  
module.exports = router;     