import play from './plays.json' assert { type: 'json' }
import nvoices from './nvoices.json' assert { type: 'json' }
import { statement, htmlStatement } from './statement.js'

console.log(statement(nvoices, play))

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = htmlStatement(nvoices, play)
})
