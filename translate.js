require('dotenv').config()
const translate = require('translate')
const oldLabels = require('./labels-eng.json') // ini labels yang di copy dari npm sentiment
const fs = require('fs')
const ProgressBar = require('progress')

translate.engine = 'google'
translate.key = process.env.TRANSLATE_API_KEY // klo mau coba ntar minta gw aja key-nya

const newLabels = {}
const size = Object.keys(oldLabels).length
const bar = new ProgressBar(`[:bar :percent] :current/${size}`, { total: size , width: 20});

// translasi label yang lama (oldLabels) ke indonesia satu per satu
// label yg sudah di translate (newLabel) lalu dimasukan kedalam newLabels

// setelah selesai tranlate di masukin ke dalam "labels-ind-after-tranlate.json"
// trus isi dari "labels-ind-after-tranlate.json" gw copy ke "labels-ind-edited.json"
// yg "labels-ind-edited.json" ini yg dipakai buat edit2

//PERMASALAHAN
// 1. Karena ada beberapa kata yang sama artinya, jumlah katanya jadi lebih sedikit, dari 3382 jadi 2133
// 2. Ada beberapa kata yang sama artinya tapi memiliki score berbeda, jadi scorenya ketiban
//    ex. kemampuan => ability: 2 dan capabilities: 1
// 3. ada beberapa kata yg belum ke translate, musti di translate manual

async function translating(){
    try {
      for(let oldLabel in oldLabels){
        let newLabel = await translate(oldLabel, {from: 'en', to: 'id'})
        newLabel = newLabel.toLowerCase()
        newLabels[newLabel] = oldLabels[oldLabel]
        bar.tick()
        if (bar.complete) {
          console.log('COMPLETE TRANSLATE')
        }
      }
      
      fs.writeFileSync('./labels-ind-after-tranlate.json', JSON.stringify(newLabels), 'utf8')
      console.log('DONE')

    } catch (error) {
      console.log(error)
    }    
}

translating()