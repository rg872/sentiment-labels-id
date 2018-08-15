const Sentiment = require('sentiment-deftbyte')
const sentiment = new Sentiment()
const idLabels = require('./labels-ind-after-translate.json') // labels yang bahasa indonesia yg cuma 1 kata
const idcustomLabels = require('./labels-ind-custom.json') // labels yang bahasa indonesia yg 2 kata atau lebih
const idCustomTokenization = require('./custom-tokenization') // ini fungsi custom token

const idLanguage = {
  labels: idLabels,
  customLabels: idcustomLabels,
  customTokenization: idCustomTokenization
};
sentiment.registerLanguage('id', idLanguage)

const analyzeOptions = {
  language: 'id'
}

// "kasih sayang": 2
// "bertepuk tangan": 2
// "berhasil": 3
const text = 'saat saya berhasil mengutarakan rasa kasih sayang ke dia, semua orang bertepuk tangan'
const result = sentiment.analyze(text, analyzeOptions)
console.dir(result)

// UDAH BISA KLO 2 KATA

// { score: 7,
//   comparative: 0.6363636363636364,
//   tokens:
//    [ 'saat',
//      'saya',
//      'berhasil',
//      'mengutarakan',
//      'rasa',
//      'kasih sayang',
//      'ke',
//      'dia',
//      'semua',
//      'orang',
//      'bertepuk tangan' ],
//   words: [ 'bertepuk tangan', 'kasih sayang', 'berhasil' ],
//   positive: [ 'bertepuk tangan', 'kasih sayang', 'berhasil' ],
//   negative: [] }