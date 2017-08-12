const path = require('path'),
      express = require('express'),
      mustacheExpress = require('mustache-express'),
      bodyParser = require('body-parser'),
      expressValidator = require('express-validator'),
      session = require('express-session'),
      pg = require('pg'),
      sequelize = require('sequelize'),
      userController = require('./controllers/user'),
      gabbleController = require('./controllers/gabble'),
      routes = require('./router');

const app = express();

//require models
const models = require('./models');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({
  additionalValidators: 'equals'
}));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'coding',
  resave: false,
  saveUninitialized: false
}));


routes(app);

app.listen(3000, function(req,res){
  console.log("app started successfully");
});
