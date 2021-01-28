var dictionary = ['apple', 'banana', 'cherry', 'pineapple', 'mango', 'orange', 'peach',
                    'plum', 'strawberry', 'lemon', 'lime', 'blueberry', 'raspberry'];
var board = [];
var lettersGuessed = [];
var word = '';
var mistakes = 0;
var playing = true;

function randomWord(){
    var num = Math.floor(Math.random() * dictionary.length);
    return dictionary[num];
}

function setUp() {
    playing = true;
    mistakes = 0;
    lettersGuessed = [];
    word = randomWord();
    board = Array(word.length);
    board.fill('_');
    $('#board').text(board.join(' '));
    $('#guessed').text(lettersGuessed);
    $('#mistakes').text('');
    $('#outcome').text('');
    $('#playAgain').attr('hidden', 'hidden');
}

function evaluateEntry(letter) {
    var match = false;
    var i = 0;
    while (true) {
        if (word.indexOf(letter, i) != -1) {
            match = true;
            i = word.indexOf(letter, i);
            board[i] = letter;
            i++;
        }
        else {
            break;
        }
    }
    $('#board').text(board.join(' '));
    if (!match) {
        mistakes++;
        $('#mistakes').text($('#mistakes').text() + 'X ')
    }
}

function checkOutcome() {
    if (mistakes == 6) {
        $('#outcome').text('LOSE');
        $('#outcome').css('color', 'red');
        $('#board').text(word.split('').join(' '));
        playing = false;
        $('#playAgain').removeAttr('hidden');
    }
    if (board.indexOf('_') == -1) {
        $('#outcome').text('WIN');
        $('#outcome').css('color', 'green');
        $('#playAgain').removeAttr('hidden');
    }
}

$(document).keydown(function(event) {
    if (event.key == 'Enter') {
        setUp();
    }
    if (playing) {
        const regex = new RegExp('[a-zA-Z]');
        if (regex.test(event.key) && event.key.length == 1) {
            if (lettersGuessed.indexOf(event.key) == -1) {
                lettersGuessed.push(event.key);
                evaluateEntry(event.key);
                $('#guessed').text(lettersGuessed);
                checkOutcome();
            }
        }
    }
});

$(document).ready(function() {
     setUp();
});
