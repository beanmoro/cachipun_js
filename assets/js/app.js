/*
    Nombre: Benjamin Moraga R.
    Seccion: G67
    Modulo: 3
*/

//Funcion principal
function main() {
    let times = 0; //Variable que almacenara el numero de rondas de la partida
    let exit = false //Variable que condiciona el funcionamiento del gameloop

    //GameLoop
    while (!exit) { 
        times = promptNumberValidation('### CACHIPUN ### \nIngrese el numero de rondas a jugar: ') // Entrada con funcion que valida numeros
        let totalScore = 0; // Variable que almacena el puntaje total
        let messages = '' // Variable que almacena el registro de mensajes ya sea de victoria, derrota o empate

        //Ciclo for que se repetira dependiendo del numero de rondas
        for (let i = 0; i < times; i++) {


            let opt = promptRoundOption(`RONDA #${i+1}: Escoge piedra, papel o tijera:`) // Variable que almacena la opcion del jugador obtenida mediante la funcion que valida ese tipo de entrada
            let currScore = processRound(opt); // Variable que almacenara el array que es obtenida por la funcion que procesa la ronda
            let currMsg = ''; //Variable limitada solo a este scope que almacenara el mensaje ya sea victoria, derrota o empate

            //Switch que decide si es una victoria, derrota o empate y asigna a la variable currMsg el mensaje correspondiente
            switch (currScore[0]) {

                case -1:
                    currMsg = `Perdiste la ronda #${i+1}. \n`
                    break;
                case 0:
                    currMsg = `Empataste la ronda #${i+1}. \n`
                    break;
                case 1:
                    currMsg = `Ganaste la ronda #${i+1}. \n`
                    break;
            }
            totalScore += currScore[0] // Se suma al puntaje total el puntaje de la ronda
            alert(currMsg) // Se imprime en pantalla el mensaje
            messages += `JUGADOR -> ${emojifyOption(currScore[1])} v/s ${emojifyOption(currScore[2])} <- BOT -- RESULTADO: ${emojifyScore(currScore[0])} \n` // Se guarda el registro de la ronda en los mensajes que se mostraran al final de la partida, con una funcion especial la cual mostrara emojis
        }

        //Al final de la partida se imprime los resultados de esta misma, y se preguna al jugador si desea jugar otra partida
        let restart = prompt(`### FIN DEL JUEGO ### \n ###   RESULTADOS  ### \nRONDAS: ${times}\nPUNTAJE: ${totalScore}\n REGISTRO: \n${messages} \nDeseas jugar otra partida? (Si/No)`)
        
        //Si el usuario ingresa no independiente si es con mayusculas o minusculas se asigna true a la variable exit para que el ciclo no continue, en caso contrario el ciclo se repetira haciendo que el jugador pueda jugar otra partida.
        if(restart.trim().toUpperCase() === 'NO'){
            exit = true;
        }
    }






}

//Funcion que valida la entrada numerica de cuantas rondas desea jugar
//Tiene como argumentos message el cual es el mensaje que mostrara el prompt, el argumento getNegatives permite discriminar negativos y el argument getZero permite discriminar el 0 dependiendo del caso
function promptNumberValidation(message = '', getNegatives = false, getZero = false) {
    let n = NaN; // Variable inicializada en NaN (Not a Number) para poder entrar al ciclo while y el usuario pueda asignar un valor
    
    //Ciclo while que se repetira hasta ingresar un dato valido
    while (isNaN(n) || (!getNegatives && n < 0) || (!getZero && n == 0)) {

        n = prompt(message); //Se obtiene el valor

        //En el caso que sea un dato invalido se le informa al usuario
        if (isNaN(n)) {
            alert('ERROR: No ingreso un dato valido!')
        } else if (!getNegatives && n < 0) {
            alert('ERROR: Los numeros negativos no estan permitidos!')
        } else if (!getZero && n < 0) {
            alert('ERROR: El cero no esta permitido!')
        }
    }
    return n; //Se retorna el dato validado
}

//Funcion la cual permite obtener y validar opcion de juego 
function promptRoundOption(message = '') {

    let opt = '' // Se inicializa la variable vacia la cual almacenara la opcion
    options = ['piedra', 'papel', 'tijera'] // Se inicializa el array que contendra las opciones validas

    //While que sirve para validar con la funcion includes, la cual revisa si la variable opt coincide con alguna palabra del array, si no es el caso el ciclo se repite
    while (!options.includes(opt.toLowerCase())) {


        opt = prompt(message); // Se obtiene el dato

        //Si el dato es invalido se le informa al usuario
        if (!options.includes(opt.toLowerCase())) {
            alert('ERROR: Ingrese alguna opcion valida!')
        }

    }

    return opt; // Se devuelve la opcion validada
}

//Funcion para procesar la ronda
//El cual recibe como argumento la opcion del jugador
function processRound(playerOpt = '') {
    //Se verifica si la opcion es valida retornara nada, evitador ejecutar codigo que no necesitara 
    // (medida seguridad extra, ya que si la entrada es validad no deberia necesitarse, aun asi me gusta agregarla)
    if (playerOpt.trim().length <= 0) {
        return;
    }

    let roundScore = -1 // Variable que contiene el score -1 el cual significa perder, lo asigno al principio asi evito agregar mas codigo redundante abajo
    playerOpt = playerOpt.toLowerCase() // Paso a minusculas la opcion escogida por el jugador asi evito errores en las condiciones
    let botOpt = botPlayRound().toLowerCase(); //Obtengo la opcion del bot y la paso a minusculas por la misma razon de la linea anterior


    
    if (
        (playerOpt == "tijera" && botOpt == "papel") || //Condiciones para que el jugador gane
        (playerOpt == "papel" && botOpt == "piedra") ||
        (playerOpt == "piedra" && botOpt == "tijera")
    ) {
        roundScore = 1 // Asigna score 1 que significa victoria
    } else if (playerOpt == botOpt) { //En el caso que el usuario y el bot tengan la misma palabra significa un empate
        roundScore = 0 //score 0 significa empate
    }
    //Retorno las opciones en un array, devolver mas informacion, y asi dar una mejor experiencia de usuario
    return [parseInt(roundScore), playerOpt, botOpt];
}

//Funcion que se encarga de que el bot juegue
function botPlayRound() {

    let botPlay = Math.floor(Math.random() * 3) //Se obtiene la jugada mediante un numero random entre 0 y 2
    let stringOption = '' // Variable que almacenara la opcion como texto

    //Switch el cual se encarga de obtener la opcion del bot como palabra
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
    return stringOption; // Retorna la palabra 
}


//Funcion la cual transforma las opciones del juego en emojis
function emojifyOption( opt){
    //Verifico si no es una opcion invalida
    if (opt.trim().length <= 0) {
        return;
    }

    let emoji = '' //Declaro una variable vacia la cual almacenara el emoji

    //Switch el cual se encarga de asignar el emoji correspondiente a la variable emoji dependiendo de la opcion
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
    return emoji; // retorno el emoji
}

//Funcion la cual transforma el puntaje en emoji
function emojifyScore( score ){
    //Verifico si el puntaje no es invalido
    if (score < -1 || score > 1) {
        return;
    }

    let emoji = '' //Declaro una variable vacia la cual almacenara el emoji

     //Switch el cual se encarga de asignar el emoji correspondiente a la variable emoji dependiendo del puntaje
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
    return emoji; // retorno el emoji
}


//Ejecuto la funcion main
main();
