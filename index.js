const TelegramBot = require('node-telegram-bot-api');
const token = '1672409239:AAF1RCimaouZs2NHUkO_Dsal6boy5mEE6WQ'
const bot = new TelegramBot(token, {polling: true})
const request = require('request')
bot.onText(/\/movie (.+)/, function(msg, match){
   const movie = match[1]
   const chatId = msg.chat.id
   request(`http://www.omdbapi.com/?apikey=bfcf3dd6&t=${movie}`, function(error, response , body){
        if(!error && response.statusCode == 200) {
            bot.sendMessage(chatId, '__Looking For__' + movie + '...', {parse_mode: 'Markdown'})
            .then(function(msg){
               const res = JSON.parse(body)
               bot.sendMessage(chatId, 
               'Result: \nTitle: ' + res.Title + 
               '\nYear: ' + res.Year + 
               '\nGenre: ' + res.Genre + 
               '\nPlot: ' + res.Plot +
               '\nActors: ' + res.Actors +
               '\nRated: ' + res.Rated +
               '\nAwards: ' + res.Awards +
               '\nReleased: ' + res.Relased +
               '\nImdb Score' + res.imdbRating +
               '\nProduction' + res.Production +
               '\nPoster: ' + res.Poster)
            })
        }
    })
})