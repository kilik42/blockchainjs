let sha256 = require('js-sha256')
let block = require('./block')
class Blockchain {
  constructor(genesisBlock){
    this.blocks = []
    this.addBlock(genesisBlock)
  }

  addBlock(block){
    if(this.blocks.length == 0){
      // console.log("geneis block")
      block.previousHash = "0000000000000000000"
      block.hash = this.generateHash(block)
    }

    this.blocks.push(block)

  }

  generateHash(block){
      let hash = sha256(block.key)
      while(!hash.startWith("00000")){
        block.nonce +=1
        hash = sha256(block.key)
        console.log(hash)
      }
      return hash
  }

  getNextBlock(transactions){
    let block = new Block()

    transactions.forEach(function(transaction){
      block.addTransaction(transaction)
    })
    let previousBlock = this.getPreviousBlock()
  }

  getPreviousBlock(){

  }
}
module.exports = Blockchain
