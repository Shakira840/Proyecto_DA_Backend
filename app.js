var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Sunny_Day78!'
});

connection.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado al servidor MySQL con id ' + connection.threadId);

  // Crear la base de datos si no existe
  connection.query('CREATE DATABASE IF NOT EXISTS proyecto_da', (err) => {
    if (err) throw err;
    console.log('Base de datos proyecto_da creada o ya existía.');

    // Cambiar conexión para usar la base de datos creada
    connection.changeUser({database : 'proyecto_da'}, (err) => {
      if (err) throw err;
      console.log('Conexión cambiada a base de datos proyecto_da');

      // Crear tabla goals si no existe
      const createGoals = `CREATE TABLE IF NOT EXISTS goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        description VARCHAR(250) NOT NULL,
        dueDate VARCHAR(250) NOT NULL
      )`;

      connection.query(createGoals, (err) => {
        if (err) throw err;
        console.log('Tabla goals creada o ya existía.');

        // Crear tabla tasks si no existe
        const createTasks = `CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(250) NOT NULL,
          description VARCHAR(250) NOT NULL,
          dueDate VARCHAR(250) NOT NULL
        )`;

        connection.query(createTasks, (err) => {
          if (err) throw err;
          console.log('Tabla tasks creada o ya existía.');

        });
      });
    });
  });
});





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if(req.headers.authorization && req.headers.authorization === '123'){
    next();
  }else{
    res.status(401).json({message: 'Unauthorized'});
  }
}
);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
