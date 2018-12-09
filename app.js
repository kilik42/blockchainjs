let Block = require('./block')
let Blockchain = require('./blockchain')

let Transaction = require('./transaction')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')



app.use(bodyParser.json())

//access the arguments
process.argv.forEach(function(val, index, array){
  console.log(array[2])
})

app.get('/', function(req, res){
  res.send("hello world")
})

app.get('/mine', function(req, res){

    let block = blockchain.getNextBlock(transactions)
    res.json(block)
})

app.post('/transactions', function(req, res){

  let to = req.body.to
  let from = req.body.from
  let amount = req.body.amount

  let transaction = new Transaction(from, to, amount)

  transactions.push(transaction)


     // console.log(req.body.to)
     // console.log(req.body.from)
     // console.log(req.body.amount)

     res.json(transactions)



})

app.get('/blockchain', function(req, res){
  let transaction = new Transaction('Mary','Jerry',100)

   let genesisBlock = new Block()
   let blockchain = new Blockchain(genesisBlock)

   let block = blockchain.getNextBlock([transaction])
   blockchain.addBlock(block)

   let anotherTransaction = new Transaction("Azam","Jerry",10)
   let block1 = blockchain.getNextBlock([anotherTransaction,transaction])
   blockchain.addBlock(block1)
 res.json(blockchain)

  // let transaction = new Transaction('Mary', 'Jerry', 100)
  //
  // let genesisBlock = new Block()
  // let blockchain = new Blockchain(genesisBlock)
  //
  // let block = blockchain.getNextBlock([transaction])
  // blockchain.addBlock(block)
  //
  // let anotherTransaction = new Transaction("Azam", "Jerry", 10)
  // let block1 = blockchain.getNextBlock([anotherTransaction, transaction])
  // blockchain.addBlock(block1)
  //
  // res.json(blockchain)

})





app.listen(3000, function(){
  console.log("server has started")
})
