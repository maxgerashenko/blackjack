function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToPoint(number) {
    switch(true){
        case (number <= 10): return number;
        case (number > 10): return 10;
    }
}

function convertToCards(number) {
    switch(number){
        case (11): return "J";
        case (12): return "Q";
        case (13): return "K";
        case (1):  return "A";
        default: return number
    }
}

function clearUI(userID) {
    let empty = '';
    $(`#${userID}#points`).text(empty);
    $(`#${userID}#cards`).text(empty);
    $(`#${userID}#count`).text(empty);
    $(`#${userID}`).removeClass('panel-success panel-danger panel-warning');
}

function Game(userID) {
    let points = [];
    let status = '';
    let isBust = false;
    let isBlackJack = false;
    let hint = '';

    this.isBust = function(){
        return isBust;
    };

    this.isBlackJack = function() {
        return isBlackJack;
    };

    this.getCount = function() {
        return status
    };

    this.getUserID = () => userID;

    this.init = function() {
        points = [];
        status = '';
        isBust = false;
        isBlackJack = false;
        this.start().count().show();
        return this
    };

    this.reset = function() {
        points = [];
        status = '';
        hint = '';
        clearUI(userID);
        return this;
    };

    this.restart = function() {
        points = [];
        status = '';
        hint = '';
        clearUI();
        this.init();
        return this;
    };

    this.start = function() {
        console.log('start');
        this.hit();
        this.hit();
        return this;
    };


    this.hit = function() {
        let x = getRandomInt(MAX_CARD_VALUE, MIN_CARD_VALUE);

        points.push(x);
        return this;
    };

    this.count = function(){
        let result = 0;
        points.sort((a, b) => b - a );
        points.forEach((a)=> {
            let val = convertToPoint(a);
            if(val === 1 && result + 11 <= 21){
                val = 11;
            }
            result += val;
        });

        isBust = result > 21;
        isBlackJack = result === 21;

        hint = (isBust) ? 'BUST' : hint;
        hint = (isBlackJack) ? 'BLACKJACK' : hint;
        status = result;
        return this;
    };

    this.show = function() {
        clearUI(userID);
        if(userID !== 'casino'){
            updateUI(this);
        }
        const cards = points.map(convertToCards);
        console.log(points);
        console.log(cards);
        console.log(status);
        $(`#${userID} .points`).text(points);
        $(`#${userID} .cards`).text(cards);
        $(`#${userID}  .count`).text(`${status} ${hint}`);
    }
}