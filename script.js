//try namespace
const game = {}

//shuffle deck
game.shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
}

//start game
game.startGame = () => {
    game.currentScore = 0
    game.currentScoreText.text(game.currentScore)
    game.mainDisplay.show()
    game.scoreboard.show()
    game.gameOver.hide()
    game.highButton.show()
    game.lowButton.show()
    game.shuffle(game.deckArray)
    game.deckCount = 0
    game.cardValueTop.text(game.deckArray[game.deckCount][0][1])
    game.cardValueBot.text(game.deckArray[game.deckCount][0][1])
    game.cardSuit.text(game.deckArray[game.deckCount][1])
}

//pressing high or low
game.press = (event) => {
    game.previous = game.deckArray[game.deckCount][0][0]
    game.deckCount++
    game.cardValueTop.text(game.deckArray[game.deckCount][0][1])
    game.cardValueBot.text(game.deckArray[game.deckCount][0][1])
    game.cardSuit.text(game.deckArray[game.deckCount][1])
    
    if (event.target.id == "low") {
    game.deckArray[game.deckCount][0][0] < game.previous 
        ? game.currentScore++ 
        : game.deckArray[game.deckCount][0][0] > game.previous 
        ? game.gameEnd()
        : console.log("Tie, go again!")
    } else {
        game.deckArray[game.deckCount][0][0] > game.previous 
        ? game.currentScore++ 
        : game.deckArray[game.deckCount][0][0] < game.previous 
        ? game.gameEnd()
        : console.log("Tie, go again!")    
    }
    game.currentScoreText.text(game.currentScore)
    game.currentScore > game.highScore ? (game.highScore = game.currentScore, game.highScoreText.text(game.highScore)) : null
}

//game over
game.gameEnd = () => {
    game.mainDisplay.hide()
    game.scoreboard.hide()
    game.gameOver.show()
    game.highButton.hide()
    game.lowButton.hide()
}

game.init = () => {

//declarations and caching 
game.deckArray = []
game.deckCount = 0
game.cardValueTop = $('#cardValueTop')
game.cardValueBot = $('#cardValueBot')
game.cardSuit = $('#cardSuit')
game.mainDisplay = $('#mainDisplay')
game.scoreboard = $('#scoreboard')
game.gameOver = $('#gameover')
game.currentScoreText = $('#currentScore')
game.currentScore =
game.highScoreText = $('#highScore')
game.highScore = 0
game.startButton = $('#startButton')
game.highButton = $('#high')
game.lowButton = $('#low')
game.previous = 0

//create deck
game.suits = ["♠",	"♥", "♦", "♣"]
game.value = [[14, "A"], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], 
[8, 8], [9, 9], [10, 10], [11, "J"], [12, "Q"], [13, "K"]]
game.suits.map(x => game.value.map(y => {
    game.deckArray.push([y, x])
}))

//event listeners
game.startButton.on('click', game.startGame)
game.highButton.on('click', game.press)
game.lowButton.on('click', game.press)
}

$(() => {
    game.init()
})


