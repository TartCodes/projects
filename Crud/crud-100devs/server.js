const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	const page = url.parse(req.url).pathname;
	if (page == '/') {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data); 
			res.end();
		});
	}
	if (page == '/random') {
        const params = querystring.parse(url.parse(req.url).query);
        let response
        if(params['user']){
            let userPick=params['user'];
            const random = Math.floor(Math.random() * 100)
            res.setHeader('Content-Type', 'application/json');
            let result=picker(random)
            response = {
                random: random,
                picker: result,
                userPick: userPick,
                winner: true,
                logic:'some explaination'
            }
        }else{
            response = {error:'please input your choice in the url as a query like ?user=paper'}
        }
        res.end(JSON.stringify(response));
	}
});
// random (1,100)
// Rock/Paper/Scissor/Lizard/Spock
const picker = (random) => {
	let result;
	switch (true) {
		case random < 20:
			result = 'rock'; //🤨
			break;
		case random < 40:
            result = 'paper'; //📜
			break;
		case random < 60:
            result = 'scissors'; //✂️
			break;
		case random < 80:
            result = 'lizard'; //🦎
			break;
		case random < 100:
            result = 'spock'; //👽
			break;
	}

	return result;
};



const winnerWinner=(userDinner,computerDinner)=>{
    let winner;
        if (userDinner === computerDinner){
            winner = 'tie';   
        }else if ((userDinner === 'rock' && computerDinner === ('scissors' || 'lizard')) ||  
                 (userDinner === 'paper' && computerDinner === ('rock' || 'spock')) || 
                 (userDinner === 'scissors' && computerDinner === ('paper' || 'lizard')) || 
                 (userDinner === 'lizard' && computerDinner === ('paper' || 'spock')) || 
                 (userDinner === 'spock' && computerDinner === ('rock' || 'scissors'))) {
                     winner = 'user'    
      }else { 
        winner = 'computer';
      }

     //scissors beats paper & lizard
     //paper beats rock & spock
     //lizard beats spock & paper
     //spock beats scissors & rock
    //rock beats scissors & lizard

     return winner;
 } 


/*
 const winReason(winChoice, loseChoice){ 
	switch (winChoice) {
		case 'rock':
			if (loseChoice === 'scissors') {
				return 'rock crushes scissors';
			} else if (loseChoice ='lizard') {
				return 'rock crushes lizard';
			}
		case 'paper':
			if (loseChoice === 'rock') {
				return 'paper covers rock';
			} else if (loseChoice ='spock') {
				return 'paper disproves spock';
			}
		case 'scissors':
			if (loseChoice === 'paper') {
				return 'scissors cut paper';
			} else if (loseChoice ='lizard') {
				return 'scissors decapitates lizard';
			}
		case 'lizard':
			if (loseChoice === 'paper') {
				return 'lizard eats paper';
			} else if (loseChoice ='spock') {
				return 'lizard poisons spock';
			}
		case 'spock':
			if (loseChoice === 'rock') {
				return 'spock vaporises rock';
			} else if (loseChoice ='scissors') {
				return 'spock smashes scissors';
			}
	}
}
*/


server.listen(8000)