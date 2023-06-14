const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user'
});

connection.connect();

app.get('/', function (req, res) {
  res.send(`
    <h1>Login Page</h1>
    <form action="/login" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <input type="submit" value="Login">
    </form>
  `);
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM user1 WHERE username = ? AND password = ?',
    [username, password],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0) {
        res.send('<h1>Home Page</h1>');
      } else {
        res.send('Incorrect username or password');
      }
    }
  );
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
