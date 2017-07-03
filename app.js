//require all modules up here
const path = require('path'),
      express = require('express'),
      mustacheExpress = require('mustache-express'),
      bodyParser = require('body-parser'),
      expressValidator = require('express-validator'),
      session = require('express-session'),
      pg = require('pg'),
      sequelize = require('sequelize'),
      middleware = require('./middleware'),
      userController = require('./controllers/user'),
      gabbleController = require('./controllers/gabble'),
      routes = require('./router');

const app = express();

//require models
const models = require('./models');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

//templatefor pages
// app.set('layout', 'layout');

//need bodyParser since using form data, then need to validate information
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({
  additionalValidators: 'equals'
}));
app.use('/static', express.static(path.join(__dirname, 'public')));

// register middleware
app.use(session({
  secret: 'coding',
  resave: false,
  saveUninitialized: false
}));

// app.use(middleware.checkIfUser);
// app.use(middleware.checkUserId);

//call
routes(app);

app.listen(3000, function(req,res){
  console.log("app started successfully");
});

//routes here:
// app.use('/', require('./router'));
// app.use('/user', require('./router'));
// app.use('/signup', require('./router'));
// app.use('/gabble', require('./router'));

// app.get('/', userController.index);
// app.get('/signup', userController.landing);
// app.post('/signup', userController.createUser);
// app.get('/login', userController.loginLanding);
// app.post('/login', userController.login);
// app.get('/gabble', gabController.landing);
// app.post('/gabble', gabController.createPost);
