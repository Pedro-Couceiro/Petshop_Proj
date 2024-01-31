//Dictionary Variables
let animallist =
    [
        { "Tipo": "Gato", "Quantidade": 10, "Dinheiro": 150, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 300, "Check": false },
        { "Tipo": "Cao", "Quantidade": 10, "Dinheiro": 150, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 300, "Check": false },
        { "Tipo": "Passaro", "Quantidade": 10, "Dinheiro": 150, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 300, "Check": false },
    ]

let racaolist =
    [
        { "Tipo": "Gato", "Quantidade": 10, "Dinheiro": 30, "TaskTime": 30, "Check": false },
        { "Tipo": "Cao", "Quantidade": 10, "Dinheiro": 30, "TaskTime": 30, "Check": false },
        { "Tipo": "Passaro", "Quantidade": 10, "Dinheiro": 30, "TaskTime": 30, "Check": false },
    ]

let pedido =
    [
        { "PedidoID": 1, "TipoPedido": "Racao", "TipoAnimal": "Cao", "Imagem": "RacaoCaoImg", "Tempo": 180 },
        { "PedidoID": 2, "TipoPedido": "Racao", "TipoAnimal": "Gato", "Imagem": "RacaoGatoImg", "Tempo": 180 },
        { "PedidoID": 3, "TipoPedido": "Racao", "TipoAnimal": "Passaro", "Imagem": "RacaoPassaroImg", "Tempo": 180 },
        { "PedidoID": 4, "TipoPedido": "Adotar", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 180 },
        { "PedidoID": 5, "TipoPedido": "Adotar", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo": 180 },
        { "PedidoID": 6, "TipoPedido": "Adotar", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo": 180 },
        { "PedidoID": 7, "TipoPedido":"Tosquia", "TipoAnimal": "Cao", "Imagem":"CaoImg", "Tempo":180},
        { "PedidoID": 8, "TipoPedido":"Tosquia", "TipoAnimal": "Gato", "Imagem":"GatoImg", "Tempo":180},
        { "PedidoID": 9, "TipoPedido":"Tosquia", "TipoAnimal": "Passaro", "Imagem":"PassaroImg", "Tempo":180},
        { "PedidoID": 10, "TipoPedido": "Passeio", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 180},
    ]

let resultsdia = { "DinheiroDia": "0", "DinheiroTotal": "0" }

let countDownTime = 600;
let countDownPedido;
let hungerCount = 300;
let gameActive = true;

let a = 0;

//Functions começam aqui

function init() {
    console.log("test");

    getCurrentTime();

    ShopTimer(countDownTime);

    AnimalFome();

    getUserLocal();

    getMoneyLocal();
}

function getCurrentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + "" + session;

    document.getElementById("HorasSpan").textContent = time;
    setTimeout(function () { getCurrentTime() }, 1000);
}

function getUserLocal() {
    let profileLocalStorage = localStorage.getItem("UserProfile");

    //Se o jogador por algum milagre n tenha entrado pelo o login 
    //Vai logo para o login screen
    if (profileLocalStorage === null) {
        console.log("Unregistred User Detected");
        window.location.replace("loginpage.html");
    }
    else {
        console.log("Registered user");
        let profileDicionario = JSON.parse(profileLocalStorage);
        document.getElementById("txt_username").textContent = profileDicionario.name;
    }
}

function getMoneyLocal() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");

    if (dinheiroLocalStorage === null) {
        console.log("Novo Jogo");

        let dinheiroProfile = JSON.stringify(resultsdia);

        localStorage.setItem("Dinheiro", dinheiroProfile);
    }
    else {
        let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

        resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;
        resultsdia.DinheiroTotal = dinheiroDicionario.DinheiroTotal;

        document.getElementById("dinheiroHoje").textContent = dinheiroDicionario.DinheiroDia + "€";
        document.getElementById("dinheiroTotal").textContent = dinheiroDicionario.DinheiroTotal + "€ total";
    }
}

function ShopTimer() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    var timer = setInterval(
        function () {
            countDownTime--;

            var minutos = Math.floor(countDownTime / 60);
            let minutosText = minutos.toString().padStart(2, '0');

            var seconds = countDownTime % 60
            var secondsDown = parseInt(seconds);
            let secondsText = secondsDown.toString().padStart(2, '0');

            if (minutos === 0) {
                document.getElementById("gameTime").textContent = minutosText + ":" + secondsText + " Segundos";
            }
            else {
                document.getElementById("gameTime").textContent = minutosText + ":" + secondsText + " Minutos";
            }

            if (countDownTime <= 0) {
                console.log("Time's up")

                clearInterval(timer);
                document.getElementById("gameTime").textContent = "00:00 - Tempo Acabou!";

                alert("Time's up! Hora de fechar a loja!");
                resultsdia.DinheiroTotal = dinheiroDicionario.DinheiroDia + dinheiroDicionario.DinheiroDia;
                resultsdia.DinheiroDia = 0;
                let dinheiroProfile = JSON.stringify(resultsdia);
                localStorage.setItem("Dinheiro", dinheiroProfile);
                getMoneyLocal();

                gameActive = false;
            }
        }, 1000)
}

//Função que começa o tempo limite do cliente
function pedidoTime(tempoLimite, a) {

    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    let zonaPedidosDiv = document.getElementById("zona_pedidos");

    let currentOrder = document.getElementById("pedido" + a);

    let tempoCount = tempoLimite;

    var timer = setInterval(

        function () {

            tempoCount--;

            if (!zonaPedidosDiv.hasChildNodes()) {
                console.log("Abort Countdown");
                clearInterval(timer);
            }

            if (tempoCount === 0) {

                clearInterval(timer);

                zonaPedidosDiv.removeChild(currentOrder);

                alert("Oops, não acabaste o pedido a tempo. O cliente saiu insatisfeito.");

                dinheiroDicionario.DinheiroDia = racaolist[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);

                resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

                let dinheiroProfile = JSON.stringify(resultsdia);

                localStorage.setItem("Dinheiro", dinheiroProfile);
                getMoneyLocal();
            }
        }, 1000)
}

//Function para gastar o tempo entre atividades
function wasteTime(taskTime) {
    countDownTime = countDownTime - taskTime;

    console.log("Tempo gastado: " + taskTime);
}

//Function para contar a fome dos animais no jogo
function AnimalFome() {
    if (gameActive) {
        let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
        let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

        const timer = setInterval(
            function () {
                for (let i = 0; i < animallist.length; i++) {
                    animallist[i].Hungy = hungerCount--;

                    console.log(animallist[i].Hungy);

                    if (animallist[i].Hungy >= 300) {
                        animallist[i].Hungy = 300;
                    }

                    if (animallist[i].Hungy === 0) {
                        clearInterval(timer);

                        alert("Um dos teus " + animallist[i].Tipo + " adoeçeu e foi para o ficou com fome. Foi Mandado para o hospital. Infelizmente isto vai te custar.");

                        animallist[i].Quantidade = animallist[i].Quantidade - 1;

                        dinheiroDicionario.DinheiroDia = racaolist[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);

                        resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

                        let dinheiroProfile = JSON.stringify(resultsdia);

                        localStorage.setItem("Dinheiro", dinheiroProfile);
                        getMoneyLocal();

                        animallist[i].Hungy = 300;
                    }
                }
            },
            1000);
    }
}


//Function para buscar a racao de um especifico animal
function getRacao(RacaoItem) {
    let i;

    if (gameActive) {
        for (i = 0; i < racaolist.length; i++) {
            if (RacaoItem === racaolist[i].Tipo) {
                racaolist[i].Quantidade = racaolist[i].Quantidade + 1;
                racaolist[i].Check = true;
                wasteTime(racaolist[i].TaskTime);

                break;
            }
        }
        console.log("Tens " + racaolist[i].Quantidade + " de racao de " + racaolist[i].Tipo);
    }
}

//Function para buscar a comida especifica de um animal
function getAnimal(Animal) {
    let i;

    if (gameActive) {

        for (i = 0; i < animallist.length; i++) {
            if (Animal === animallist[i].Tipo) {
                animallist[i].Quantidade = animallist[i].Quantidade + 1;
                animallist[i].Check = true;
                wasteTime(animallist[i].GetTaskTime);

                break;
            }
        }
        console.log("Tens " + animallist[i].Quantidade + " " + animallist[i].Tipo);
    }
}

//Função para alimentar os animais.
function feedAnimal(Animal) {

    let promptText = "Pretende começar o processo de alimentação do " + Animal + "? Carregue OK se sim, carregue CANCEL se não";

    if (gameActive) {
        if (confirm(promptText)) {
            for (let i = 0; i < racaolist.length; i++) {
                if (Animal === racaolist[i].Tipo) {
                    if (racaolist[i].Check == true) {
                        racaolist[i].Quantidade = racaolist[i].Quantidade - 1;
                        wasteTime(animallist[i].FeedTaskTime);
                        console.log("Sucessful feeding");

                        animallist[i].Hungy = animallist[i].Hungy + 50;

                        alert(Animal + " alimentado com sucesso!");
                        if (racaolist[i].Quantidade === 0) {
                            racaolist[i].Check = true;
                        }

                        break;
                    }
                    else {
                        alert("Não tem a ração do " + Animal + ".");
                    }
                }
            }
        }
    }
}

//Função para fazer os pedidos de Balcão
function pedidoBalcao() {
    if (gameActive) {
        //Div exclusivamente para por pedidos la no html
        let zonaPedidosDiv = document.getElementById("zona_pedidos");

        if (zonaPedidosDiv.hasChildNodes()) {
            alert("Atingiu o limite de pedidos");
        }
        else {
            //Genera um numero aleatorio entre 1 a 10
            let pedidoNumber = Math.floor(Math.random() * 10) + 1

            for (let i = 0; i < pedido.length; i++) {
                if (pedidoNumber === pedido[i].PedidoID) {
                    console.log("O cliente pediu por:" + pedido[i].TipoPedido);

                    countDownPedido = pedido[i].Tempo;

                    //Cria um buttao, botao tem os parametros do tipo de pedido e tipo de animal
                    let newPedido = document.createElement("Button");
                    newPedido.setAttribute("id", "pedido" + a);
                    newPedido.setAttribute("onclick", "giveOrder('" + a + "','" + pedido[i].TipoPedido + "', '" + pedido[i].TipoAnimal + "')");

                    //Imagem vai para dentro do buttao
                    let imgPedido = document.createElement("img");
                    imgPedido.setAttribute("src", "./images/" + pedido[i].Imagem + ".png");
                    imgPedido.setAttribute("alt", pedido[i].Imagem);

                    zonaPedidosDiv.appendChild(newPedido);
                    newPedido.appendChild(imgPedido);
                    pedidoTime(countDownPedido, a);

                    a++;

                    //Acaba aqui para n fazer asneira
                    break;
                }
            }
        }
    }
}

//Função para dar Order ao Cliente
function giveOrder(a, TipoPedido, Animal) {
    if (gameActive) {
        let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
        let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

        let zonaPedidosDiv = document.getElementById("zona_pedidos");
        let currentOrder = document.getElementById("pedido" + a);

        let promptText = "De certeza que quer completar este pedido? Carregue OK se sim, carregue CANCEL se não";

        let i;

        if (confirm(promptText)) {
            //Se o tipo de Pedido e for de adocao
            if (TipoPedido === 'Adotar') {
                for (i = 0; i < animallist.length; i++) {

                    //Verifica o tipo de Animal
                    if (Animal === animallist[i].Tipo) {

                        //Verifica se tem o animal
                        if (animallist[i].Check == true) {
                            //Subtrai a quantidade que o jogador tem
                            animallist[i].Quantidade = animallist[i].Quantidade - 1;

                            //Soma o dinheiro
                            dinheiroDicionario.DinheiroDia = animallist[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);

                            //Remove o pedido
                            zonaPedidosDiv.removeChild(currentOrder);


                            //Se chegar a quantidade chegar a zero, o check fica falso
                            if (animallist[i].Quantidade === 0) {
                                animallist[i].Check = false;
                            }
                            console.log("Sucessful Order");
                            break;
                        }

                        else {
                            console.log("Failed Order");
                            alert("Não tens o pedido do Cliente. O cliente não está satisfeito.");

                            //Subtrai o dinheiro
                            dinheiroDicionario.DinheiroDia = animallist[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);
                            break;
                        }
                    }
                }
                console.log("Tens " + animallist[i].Quantidade + " " + animallist[i].Tipo);
            }
            //Se o tipo de Pedido e de Racao
            else {
                for (i = 0; i < racaolist.length; i++) {
                    //Verifica o tipo de racao
                    if (Animal === racaolist[i].Tipo) {
                        //Verifica se tem mesmo a racao
                        if (racaolist[i].Check == true) {
                            //Subtrai a quantidade que o jogador tem
                            racaolist[i].Quantidade = racaolist[i].Quantidade - 1;

                            dinheiroDicionario.DinheiroDia = racaolist[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);

                            //Remove o pedido
                            zonaPedidosDiv.removeChild(currentOrder);

                            //Se chegar a quantidade chegar a zero, o check fica falso
                            if (racaolist[i].Quantidade === 0) {
                                racaolist[i].Check = false;
                            }
                            console.log("Sucessful Order");
                            break;
                        }
                        else {
                            alert("Não tens o pedido do Cliente");
                            alert("Não tens o pedido do Cliente. O cliente não está satisfeito.");

                            dinheiroDicionario.DinheiroDia = racaolist[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);
                            break;
                        }
                    }
                }
                console.log("Tens " + racaolist[i].Quantidade + " de racao de " + racaolist[i].Tipo);
            }
            console.log("Dinheiro Recebido: " + dinheiroDicionario.DinheiroDia);
            resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

            let dinheiroProfile = JSON.stringify(resultsdia);

            localStorage.setItem("Dinheiro", dinheiroProfile);
            getMoneyLocal();
        }
    }
}