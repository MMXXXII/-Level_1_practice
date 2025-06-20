const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // по умолчанию в XAMPP пустой пароль
  database: 'ChatBotTests'
});

module.exports = pool.promise();
