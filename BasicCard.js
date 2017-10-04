var fs = require('fs');

module.exports.cardCreator = function (front, back) {

    function BasicCard(front, back) {
        this.front = front;
        this.back = back;
    }
    var newCard = new BasicCard(front, back);
    var txt = 'basicCard,' + newCard.front + ',' + newCard.back + ',';
    fs.appendFile('flashCards.txt', txt, function(err){
        if(err){
            console.log(err);
        }
    })
}