


function main() {
    let times = 0;
    let exit = false

    while (!exit) {
        times = promptNumberValidation('### CACHIPUN ### \nIngrese el numero de rondas a jugar: ')
        let totalScore = 0;
        let messages = ''


        for (let i = 0; i < times; i++) {


            let opt = promptRoundOption(`RONDA #${i}: Escoge piedra, papel o tijera:`)
            let currScore = 0;
            currScore = processRound(opt);
            let currMsg = '';
            let rMsg = ''

            switch (currScore[0]) {

                case -1:
                    currMsg = `Perdiste la ronda #${i}. \n`
                    rMSG = 'X'
                    break;
                case 0:
                    currMsg = `Empataste la ronda #${i}. \n`
                    break;
                case 1:
                    currMsg = `Ganaste la ronda #${i}. \n`
                    break;
            }
            totalScore += currScore[0]
            alert(currMsg)
            messages += ` ${emojifyOption(currScore[1])} v/s ${emojifyOption(currScore[2])} = ${emojifyScore(currScore[0])} \n`
        }

        let restart = prompt(`### FIN DEL JUEGO ### \n ###   RESULTADOS  ### \n RONDAS: ${times}\n PUNTAJE: ${totalScore}\n REGISTRO: \n ${messages} \n Deseas jugar otra partida? (Si/No)`)
        
        if(restart.trim().toUpperCase() === 'NO'){
            exit = true;
        }
    }






}


function promptNumberValidation(message = '', getNegatives = false, getZero = false) {
    let n = NaN;
    while (isNaN(n) || (!getNegatives && n < 0) || (!getZero && n == 0)) {

        n = prompt(message);

        if (isNaN(n)) {
            alert('ERROR: No ingreso un dato valido!')
        } else if (!getNegatives && n < 0) {
            alert('ERROR: Los numeros negativos no estan permitidos!')
        } else if (!getZero && n < 0) {
            alert('ERROR: El cero no esta permitido!')
        }
    }
    return n;
}

function promptRoundOption(message = '') {

    let opt = ''
    options = ['piedra', 'papel', 'tijera']

    while (!options.includes(opt.toLowerCase())) {

        opt = prompt(message);
        console.log(`${opt} \n ${(opt.trim().length <= 0)} \n ${options.includes(opt.toLowerCase()) }\n`)
        if (!options.includes(opt.toLowerCase())) {
            alert('ERROR: Ingrese alguna opcion valida!')
        }

    }

    return opt;
}


function processRound(playerOpt = '') {
    if (playerOpt.trim().length <= 0) {
        return;
    }

    let roundScore = -1
    playerOpt = playerOpt.toLowerCase()
    let botOpt = botPlayRound().toLowerCase();


    if (
        (playerOpt == "tijera" && botOpt == "papel") ||
        (playerOpt == "papel" && botOpt == "piedra") ||
        (playerOpt == "piedra" && botOpt == "tijera")
    ) {
        roundScore = 1
    } else if (playerOpt == botOpt) {
        roundScore = 0
    }
    return [parseInt(roundScore), playerOpt, botOpt];
}


function botPlayRound() {

    let botPlay = Math.floor(Math.random() * 3)
    let stringOption = ''

    switch (botPlay) {

        case 0:
            stringOption = "Piedra";
            break;
        case 1:
            stringOption = "Papel";
            break;
        case 2:
            stringOption = "Tijera";
            break;
    }
    return stringOption;
}

function emojifyOption( opt){
    if (opt.trim().length <= 0) {
        return;
    }

    let emoji = ''

    switch(opt.toLowerCase()){
        case 'piedra':
            emoji = '🪨'
            break;
        case 'papel':
            emoji = '📜'
            break;
        case 'tijera':
            emoji = '✂️'
            break;
    }
    return emoji;
}

function emojifyScore( score ){
    if (score < -1 || score > 1) {
        return;
    }

    let emoji = ''

    switch(score){
        case -1:
            emoji = '​🥺'
            break;
        case 0:
            emoji = '😑​'
            break;
        case 1:
            emoji = '🙂'
            break;
    }
    return emoji;
}


main();
