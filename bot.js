
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет, октагон!');
});

bot.onText(/\/help/, (msg) => {
  const helpText = `
Доступные команды:
/help - показать этот список
/site - ссылка на сайт октагона
/creator - узнать ФИО создателя бота
  `;
  bot.sendMessage(msg.chat.id, helpText);
});

bot.onText(/\/site/, (msg) => {
  const siteUrl = 'https://oktagon.example.com';
  bot.sendMessage(msg.chat.id, `Вот ссылка на сайт октагона: ${siteUrl}`);
});

bot.onText(/\/creator/, (msg) => {
  const fullName = 'Серёгин Семён Евгеньевич';  
  bot.sendMessage(msg.chat.id, `Создатель бота: ${fullName}`);
});
