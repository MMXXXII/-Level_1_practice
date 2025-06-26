require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql2');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Подключение к MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключено к MySQL');
});

// /randomItem
bot.onText(/\/randomItem/, (msg) => {
  db.query('SELECT * FROM items ORDER BY RAND() LIMIT 1', (err, results) => {
    if (err || results.length === 0) {
      bot.sendMessage(msg.chat.id, 'Ошибка при получении случайного предмета.');
      return;
    }
    const item = results[0];
    bot.sendMessage(msg.chat.id, `(${item.id}) - ${item.name}: ${item.desc}`);
  });
});

// /getItemByID <id>
bot.onText(/\/getItemByID (\d+)/, (msg, match) => {
  const id = match[1];
  db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) {
      bot.sendMessage(msg.chat.id, 'Предмет не найден.');
      return;
    }
    const item = results[0];
    bot.sendMessage(msg.chat.id, `(${item.id}) - ${item.name}: ${item.desc}`);
  });
});

// /deleteItem <id>
bot.onText(/\/deleteItem (\d+)/, (msg, match) => {
  const id = match[1];
  db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
    if (err) {
      bot.sendMessage(msg.chat.id, 'Ошибка при удалении.');
      return;
    }
    if (result.affectedRows > 0) {
      bot.sendMessage(msg.chat.id, `Предмет с ID ${id} удалён.`);
    } else {
      bot.sendMessage(msg.chat.id, `Ошибка: предмет с ID ${id} не найден.`);
    }
  });
});
