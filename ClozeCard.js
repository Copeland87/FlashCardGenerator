var fs = require('fs');

module.exports.cardCreator = function (text, cloze) {

    function ClozeCard(text, cloze) {
        this.cloze = cloze;
        this.fullText = text;
        this.partial = this.fullText.replace(cloze, '...');
    }
    var newCard = new ClozeCard(text, cloze);
    var txt = 'clozeCard,' + newCard.partial + ',' + newCard.cloze + ',' + newCard.fullText + ',';
    fs.appendFile('flashCards.txt', txt, function(err){
        if(err){
            console.log(err);
        }
    })
}