document.querySelector('button').addEventListener('click', drawTwo)
let deckId = ""

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data)

    deckId = data.deck_id;
    console.log(deckId)
    })

    .catch(err => {
        console.log(`error ${err}`)
    });

    let player1Score = 0;
    let player2Score = 0;

function drawTwo() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#player1').src = data.cards[0].image
            document.querySelector('#player2').src = data.cards[1].image
            let player1Value = convertToNum(data.cards[0].value)
            let player2Value = convertToNum(data.cards[1].value)



            if (player1Value > player2Value) {
                player1Score += Number(player1Value)
                player2Score += Number(player2Value)
                console.log(player1Score)
                console.log(player2Score)
                document.querySelector('#player1Score').value = player1Score
                document.querySelector('#player2Score').value = player2Score
                document.querySelector('#cardsRemaining').value = data.remaining


            } else if (player1Value < player2Value) {
                player1Score += Number(player1Value)
                player2Score += Number(player2Value)
                console.log(player1Score)
                console.log(player2Score)
                document.querySelector('#player1Score').value = player1Score
                document.querySelector('#player2Score').value = player2Score
                document.querySelector('#cardsRemaining').value = data.remaining


            } else {
                player1Score += Number(player1Value)
                player2Score += Number(player2Value)
                console.log(player1Score)
                console.log(player2Score)
                document.querySelector('#player1Score').value = player1Score
                document.querySelector('#player2Score').value = player2Score
                document.querySelector('#cardsRemaining').value = data.remaining
            }


            if (data.remaining === 0 && player1Score > player2Score) {
                document.querySelector('h3').innerText = "Player 1 Wins!"
            } else if (data.remaining === 0 && player1Score < player2Score) {
                document.querySelector('h3').innerText = "Player 2 Wins!"
            } else if (data.remaining === 0 && player1Score === player2Score) {
                document.querySelector('h3').innerText = "Tied Game!"

            }
            
    })

    .catch(err => {
        console.log(`error ${err}`)
    });
}

function convertToNum(val) {
    if (val === "ACE") {
        return 14
    } else if (val === "KING") {
        return 13
    } else if (val === "QUEEN") {
        return 12
    } else if (val === "JACK") {
        return 11
    } else {
        return val
    }
}


