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
    console.error('Error conectando: ' + err.stack);
    return;
  }
  console.log('Conectado con id ' + connection.threadId);
});

router.get('/getGoals', function(req, res, next) {
  let query = 'SELECT * FROM goals';
  connection.query(query, function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener goals' });
    }
    res.json(results);
  });
});

router.delete('/removeGoal/:id', function(req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'ID requerido' });
  }
  let query = 'DELETE FROM goals WHERE id = ?';
  connection.query(query, [id], function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar goal' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Goal no encontrado' });
    }
    res.json({ message: 'Goal eliminado correctamente' });
  });
});

router.post('/addGoal', function(req, res, next) {
  const { name, description, dueDate } = req.body;
  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  let query = 'INSERT INTO goals (name, description, dueDate) VALUES (?, ?, ?)';
  connection.query(query, [name, description, dueDate], function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al agregar goal' });
    }
    res.status(201).json({ message: 'Goal agregado', id: results.insertId });
  });
});

module.exports = router;
