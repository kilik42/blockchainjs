let Block = require('./block')
let Blockchain = require('./blockchain')
let BlockchainNode = require('./BlockchainNode')
let Transaction = require('./transaction')

let fetch = require('node-fetch')


const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let port = 3000


let transactions = []
let nodes = []
let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)
app.use(bodyParser.json())
//access the arguments
process.argv.forEach(function(val, index, array){
  port = array[2]
})

if(port == undefined){
  port = 3000
}

app.get('./resolve', function(reeq,res){
    nodes.forEach(function(node){

      fetch(node.url+ './blockchain')
      .then(function(response){
        return response.json()
      })
      .then(function(blockchain){
        console.log(blockchain)
      })
    })

})
app.post('nodes/register', function(req, res){
  let nodesList = req.body.urls
  nodesList.forEach(function(nodeDictionary){
    let node = new BlockchainNode(nodeDictionary["url"])
    nodes.push(node)
  })


  res.json(nodes)
})

app.get('/nodes',function(req, res){
  res.json(nodes)
})



app.get('/', function(req, res){
  res.send("hello world")
})

//route for mining
app.get('/mine', function(req, res){

    let block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    transactions = []
    console.log(transactions)
    res.json(block)
})

app.post('/transactions', function(req, res){

  let to = req.body.to
  let from = req.body.from
  let amount = req.body.amount

  let transaction = new Transaction(from, to, amount)

  transactions.push(transaction)

     res.json(transactions)
})

app.get('/blockchain', function(req, res){
 //  let transaction = new Transaction('Mary','Jerry',100)
 //
 //   let genesisBlock = new Block()
 //   let blockchain = new Blockchain(genesisBlock)
 //
 //   let block = blockchain.getNextBlock([transaction])
 //   blockchain.addBlock(block)
 //
 //   let anotherTransaction = new Transaction("Azam","Jerry",10)
 //   let block1 = blockchain.getNextBlock([anotherTransaction,transaction])
 //   blockchain.addBlock(block1)
 // res.json(blockchain)

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
