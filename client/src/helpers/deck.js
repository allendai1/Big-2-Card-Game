import Card from './card'

export default class Deck {

    // create a shuffled deck of cards
    constructor(){
        let val = ['3','4','5','6','7','8','9','10','J','Q','K','A','2']
        let suit = ["D","C","H","S"]
        this.cards = []
        
        
       
        
        val.forEach(i=>suit.forEach(j=>{
            let card = new Card(null,i,j)
            
            this.cards.push(card)
        }))
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        
        
    };

    // select random card to remove and return
    deal(){
        if(this.cards.length ==0){
            throw 'Deck is empty'
        }
        return this.cards.pop();
    }
    split2(){
        let hand1=[]
        let hand2=[]
        for(let i=0;i<17;i++){
            hand1.push(this.cards.pop())
            hand2.push(this.cards.pop())
        }
        return [hand1,hand2]

    }
    split4(){
        let hand1=[]
        let hand2=[]
        let hand3=[]
        let hand4=[]
        for(let i=0;i<13;i++){
            hand1.push(this.cards.pop())
            hand2.push(this.cards.pop())
        }
        return [hand1,hand2,hand3,hand4]

    }
    



}