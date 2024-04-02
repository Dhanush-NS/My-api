const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express()

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myapi',
    port: '3306'
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myapi',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });   

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/now', function(req, res){
    res.send({
        now: new Date()
    })
})

app.get('/users', (req, res) => {
    // Query to fetch users from the database
    connection.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      // Respond with the fetched data as JSON
      res.json(results);
    });
  });

  app.post('/users', (req, res) => {
    // Extract user data from the request body
    const { username, usernumber } = req.body;

    pool.query('INSERT INTO users (username, usernumber) VALUES (?, ?)', [username, usernumber], (error, results) => {
        if (error) {
          console.error('Error adding user:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        // Respond with the ID of the newly inserted user
        res.json({ id: results.insertId });
      });
    });

  process.on('SIGINT', () => {
    connection.end();
    console.log('MySQL connection closed');
  });

app.listen(3000)