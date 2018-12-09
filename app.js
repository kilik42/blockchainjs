let Block = require('./block')
let Blockchain = require('./blockchain')
let BlockchainNode = require('./BlockchainNode')
let Transaction = require('./transaction')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let port = 3000

app.use(bodyParser.json())

//access the arguments
process.argv.forEach(function(val, index, array){
  port = array[2]
})

if(port==undefined){
  port = 3000
}
app.post('nodes/register', function(req, res){
  let nodesList = req.body.urls
  nodesList.forEach(function(nodeDictionary){
    let node = new BlockchainNode(nodeDictionary["url"])
    nodes.push(nodes)
  })


  res.json(nodes)
})

app.get('/nodes',function(req, res){
  res.json(nodes)
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





app.listen(port, function(){
  console.log("server has started")
})
