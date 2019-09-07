const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const adminroutes = require("./routes/adminroutes");
const userroutes = require("./routes/userroutes");

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

const server = app.listen(port, (req, res) => {
    console.log(`Server started at port ${port}..`)
  });