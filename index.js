require('dotenv').config()
const translate = require('translate')
const labels = require('./labels-eng.json') // ini labels yang di copy dari npm sentiment
const fs = require('fs')
const ProgressBar = require('progress')

translate.engine = 'google'
translate.key = process.env.TRANSLATE_API_KEY // klo mau coba ntar minta gw aja key-nya

const size = Object.keys(labels).length;
const bar = new ProgressBar(':bar :percent', { total: size , width: 20});

// translasi key labels satu per satu
// lalu delete key yg bahasa inggris
// tapi urutannya setelah di translate jadi berantakan
async function translating(){
    try {
      for(let key in labels){
        let text = await translate(key, {from: 'en', to: 'id'})
        labels[text] = labels[key]
        delete labels[key]
        bar.tick()
        if (bar.complete) {
          console.log('COMPLETE TRANSLATE')
        }
      }      
    } catch (error) {
      console.log(error)
    }    
}

// setelah tranlate di masukin ke dalam "labels-ind-after-tranlate.json"
// trus isi dari "labels-ind-after-tranlate.json" gw copy ke "labels-ind-edited.json"
// yg "labels-ind-edited.json ini yg dipakai buat edit2"
async function begin(){
  try {
    await translating()
    // console.log(labels)
    fs.writeFileSync('./labels-ind-after-tranlate', JSON.stringify(labels), 'utf8')
    console.log('DONE')
  } catch (error) {
    console.log(error)
  }
}

begin()