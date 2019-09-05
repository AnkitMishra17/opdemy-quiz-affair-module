const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql      = require('mysql');

const app = express();
const port = process.env.PORT || 3000

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

app.get('/dashboard', (req,res) =>{
  res.render('dashboard');
});

app.get('/add-quiz', (req,res) =>{
  res.render('add-quiz');
});

app.get('/take-quiz', (req,res) =>{
  const sql = 'SELECT * FROM questions';
  connection.query(sql, function (error, results, fields) {
      if (error){
          throw error;
      }else{
        let answerkey = new Array();;
        for(let i = 0; i < results.length; i++){
          answerkey[i] = results[i].answer 
        }
        res.render('take-quiz',{data: results,answers: answerkey});
      }    
  });
});

app.post('/add-quiz', (req,res) =>{
  const {question, optionA, optionB, optionC, optionD, answer} = req.body;
  const sql = "INSERT INTO questions (question, optiona, optionb, optionc, optiond, answer) VALUES ('"+ question +"', '"+ optionA +"', '"+ optionB +"','"+ optionC +"','"+ optionD +"','"+ answer +"')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.redirect('/add-quiz');
  });
});

app.get('/add-current-affairs', (req,res) =>{
  res.render('add-current-affairs');
});

app.post('/', (req,res) =>{
  res.redirect('/dashboard');
});

const server = app.listen(port, (req, res) => {
    console.log(`Server started at port ${port}..`)
  });