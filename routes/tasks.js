var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Sunny_Day78!',
  database : 'proyecto_da'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error conectando a MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado con id ' + connection.threadId);
});

// Obtener todas las tareas
router.get('/getTasks', function(req, res, next) {
  connection.query('SELECT * FROM tasks', function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener tareas' });
    }
    res.json(results);
  });
});

// Agregar una tarea nueva
router.post('/addTask', function(req, res, next) {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  let query = 'INSERT INTO tasks (name, description, dueDate) VALUES (?, ?, ?)';
  connection.query(query, [name, description, dueDate], function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al agregar tarea' });
    }
    res.status(201).json({ message: 'Tarea agregada', id: results.insertId });
  });
});

// Borrar tarea por id
router.delete('/deleteTask/:id', function(req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID requerido' });
  }

  let query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [id], function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada correctamente' });
  });
});

module.exports = router;
