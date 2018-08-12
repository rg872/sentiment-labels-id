require('dotenv').config()
const translate = require('translate')
const labels = require('./labels-eng.json')
const fs = require('fs')
const ProgressBar = require('progress')

translate.engine = 'google'
translate.key = process.env.TRANSLATE_API_KEY

const size = Object.keys(labels).length;
const bar = new ProgressBar(':bar :percent', { total: size , width: 20});

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