
// SEBELUM JALANIN INI, GANTI LABEL DI DALAM node_modules/sentiment/languages/en/labels.json
// di tiban sama labels-ind-edited.json

const Sentiment = require('sentiment')
const sentiment = new Sentiment()
// "kasih sayang": 2
// "bertepuk tangan": 2
const text = 'saat saya berhasil mengutarakan rasa kasih sayang ke dia, semua orang bertepuk tangan'
const result = sentiment.analyze(text)
console.dir(result)

//  ENGGAK BISA KLO 2 KATA, MALAH INI RESULTNYA

// { score: 5,
//   comparative: 0.38461538461538464,
//   tokens:
//    [ 'saat',
//      'saya',
//      'berhasil',
//      'mengutarakan',
//      'rasa',
//      'kasih',
//      'sayang',
//      'ke',
//      'dia',
//      'semua',
//      'orang',
//      'bertepuk',
//      'tangan' ],
//   words: [ 'sayang', 'berhasil' ],
//   positive: [ 'sayang', 'berhasil' ],
//   negative: [] }