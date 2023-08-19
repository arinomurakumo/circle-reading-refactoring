import play from './plays.json' assert { type: 'json' }
import nvoices from './nvoices.json' assert { type: 'json' }
import { statement } from './statement.js'

console.log(statement(nvoices, play))
