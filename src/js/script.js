function updateUI(game) {
    if (game.isBust()) {
        $("#hit").addClass('hidden');
        $("#stand").addClass('hidden');
    } else if (game.isBlackJack()) {
        $("#hit").addClass('hidden');
    } else {
        $("#hit").removeClass('hidden');
        $("#stand").removeClass('hidden');
    }
    return game;
}

function restart() {
    casino.reset();
    casino.hit().count().show();
    player.restart();
}

function playerHit() {
    player.hit().count().show();
    if(player.isBust()){
        showWinner('casino');
    }
}

function stand() {
    $('#hit').addClass('hidden');
    $('#stand').addClass('hidden');
    setTimeout(()=>{
        casino.hit().count().show();

        if(
            casino.isBust() ||
            casino.isBlackJack() ||
            casino.getCount() > player.getCount()
        ) {
            const winner = getWinner();
            if(winner){
                showWinner(winner);
            }
            return
        }

        stand();
    }, 1000);
}

function showWinner(winner){
    if(winner === 'draw') {
        $('#casino').addClass('panel-warning');
        $('#player').addClass('panel-warning');
    }

    const other = (winner === 'casino')?'player':'casino';

    $('#' + winner).addClass('panel-success');
    $('#' + other).addClass('panel-danger');
}

function getWinner() {
    if ( player.isBust() ) {
        return casino.getUserID();
    } else if (casino.isBust()) {
        return player.getUserID()
    }

    if ( player.isBlackJack() && !casino.isBlackJack() ) {
        return player.getUserID();
    }

    if ( !player.isBlackJack() && casino.isBlackJack() ) {
        return casino.getUserID();
    }

    if(
        ( player.isBlackJack() && casino.isBlackJack() ) ||
        player.getCount() === casino.getCount()
    ) {
        return 'draw'
    }

    return ( player.getCount() > casino.getCount() )
        ? player.getUserID()
        : casino.getUserID()
}

const casino = new Game("casino");
const player = new Game("player");

casino.hit().count().show();
player.init();
