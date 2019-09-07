const express = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const viewsPath = path.join(__dirname, "/views");

app.set('view engine', 'ejs')
app.set("views", viewsPath)

app.use('/public',express.static(path.join(__dirname, "../public")));

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'opdemy'
  });
  
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('Connection Established');
  });  

app.get('/', (req,res) =>{
          res.render('login');
});

app.post('/', (req,res) =>{
  let {username, password} = req.body;
  console.log(username,password);
  if (username && password) {
    const sql = "SELECT * FROM admin WHERE username = '"+ username +"' AND password = '"+ password +"'";
    connection.query(sql, function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/dashboard');
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

app.get('/dashboard', (req,res) =>{
      isloggedin(req,res,'dashboard');
});

app.get('/add-quiz', (req,res) =>{
  isloggedin(req,res,'add-quiz');
});

app.get('/add-current-affairs', (req,res) =>{
  isloggedin(req,res,'add-current-affairs');
});

app.get('/take-quiz', (req,res) =>{
  res.render('take-quiz');
});

isloggedin = (req,res,page) => {
  if (req.session.loggedin) {
    res.render(page);
} else {
  res.redirect('/');
}
};

app.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

app.get('/take-subject-quiz', (req,res) =>{
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

app.get('/current-affairs-quiz', (req,res) =>{
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

app.post('/add-quiz', (req,res) =>{
  const {question, optionA, optionB, optionC, optionD, answer} = req.body;
  const sql = "INSERT INTO subject_quiz (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/add-quiz');
  });
});

app.post('/add-current-affairs', (req,res) =>{
  const {question, optionA, optionB, optionC, optionD, answer} = req.body;
  const sql = "INSERT INTO current_affair_quiz (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/add-quiz');
  });
});

const server = app.listen(port, (req, res) => {
    console.log(`Server started at port ${port}..`)
  });