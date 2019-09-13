const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const adminroutes = require("./routes/adminroutes");
const userroutes = require("./routes/userroutes");
const connection = require('./db/models');

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

app.get('/', (req,res) =>{
          res.render('index');
});

//admin-routes
app.use("/admin-login", adminroutes)

//user-routes
app.use("/take-quiz", userroutes)

app.get('/past-questions', (req,res) =>{
  
  const sql = 'SELECT Date FROM current_affair_quiz ORDER BY Date ';
  connection.query(sql, function (error, results, fields) {
      if (error){
          throw error;
      }else{
        var demodate = results[0].Date.toDateString();
        demodate = demodate.split(" ");
        console.log(demodate);
        res.render('past-questions');
      }    
  });
});

const server = app.listen(port, (req, res) => {
    console.log(`Server started at port ${port}..`)
  });