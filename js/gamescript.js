//Dictionary Variables
let animallist =
    [
        { "Tipo": "Gato", "Quantidade": 10, "Dinheiro": 150, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 300, "Check": true },
        { "Tipo": "Cao", "Quantidade": 10, "Dinheiro": 150, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 300, "Check": true },
        { "Tipo": "Passaro", "Quantidade": 10, "Dinheiro": 150, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 300, "Check": true },
    ]

let racaolist =
    [
        { "Tipo": "Gato", "Quantidade": 10, "Dinheiro": 30, "TaskTime": 30, "Check": true },
        { "Tipo": "Cao", "Quantidade": 10, "Dinheiro": 30, "TaskTime": 30, "Check": true },
        { "Tipo": "Passaro", "Quantidade": 10, "Dinheiro": 30, "TaskTime": 30, "Check": true },
    ]

let tosquiaStatus =
    [
        { "Tipo": "Gato", "TaskTime": 30, "Dinheiro": 70, "Check": false },
        { "Tipo": "Cao", "TaskTime": 30, "Dinheiro": 70, "Check": false },
        { "Tipo": "Passaro", "TaskTime": 30, "Dinheiro": 70, "Check": false },
    ]

let banhoStatus = 
[
    {"Tipo":"Gato", "TaskTime":30, "Dinheiro":70, "Check":false},
    {"Tipo":"Cao", "TaskTime":30, "Dinheiro":70, "Check":false},
    {"Tipo":"Passaro", "TaskTime":30, "Dinheiro":70, "Check":false},
]

let passeioStatus =
    [
        { "TipoAnimal": "Cao", "TaskTime": 30, "Dinheiro": 70, "Check": false },
    ]

let pedido =
    [
        { "PedidoID": 1, "TipoPedido": "Racao", "TipoAnimal": "Cao", "Imagem": "RacaoCaoImg", "Tempo": 180 },
        { "PedidoID": 2, "TipoPedido": "Racao", "TipoAnimal": "Gato", "Imagem": "RacaoGatoImg", "Tempo": 180 },
        { "PedidoID": 3, "TipoPedido": "Racao", "TipoAnimal": "Passaro", "Imagem": "RacaoPassaroImg", "Tempo": 180 },
        { "PedidoID": 4, "TipoPedido": "Animal", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 180 },
        { "PedidoID": 5, "TipoPedido": "Animal", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo": 180 },
        { "PedidoID": 6, "TipoPedido": "Animal", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo": 180 },
        { "PedidoID": 7, "TipoPedido": "TosquiaCao", "TipoAnimal": "Cao", "Imagem": "CaoImg", "Tempo": 180 },
        { "PedidoID": 8, "TipoPedido": "TosquiaGato", "TipoAnimal": "Gato", "Imagem": "GatoImg", "Tempo": 180 },
        { "PedidoID": 9, "TipoPedido": "TosquiaPassaro", "TipoAnimal": "Passaro", "Imagem": "PassaroImg", "Tempo": 180 },
        { "PedidoID": 10, "TipoPedido": "BanhoCao", "TipoAnimal": "Cao", "Imagem": "CaoImg", "Tempo": 180 },
        { "PedidoID": 11, "TipoPedido": "BanhoGato", "TipoAnimal": "Gato", "Imagem": "GatoImg", "Tempo": 180 },
        { "PedidoID": 12, "TipoPedido": "BanhoPassaro", "TipoAnimal": "Passaro", "Imagem": "PassaroImg", "Tempo": 180 },
        { "PedidoID": 13, "TipoPedido": "PasseioCao", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 180 },
    ]

let inventory =
    [
        { "Tipo": "Animal", "TipoAnimal": "Cao", "Quantidade": 0, "Dinheiro": 150, "HasCheck": false },
        { "Tipo": "Animal", "TipoAnimal": "Gato", "Quantidade": 0, "Dinheiro": 150, "HasCheck": false },
        { "Tipo": "Animal", "TipoAnimal": "Passaro", "Quantidade": 0, "Dinheiro": 150, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Cao", "Quantidade": 0, "Dinheiro": 30, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Gato", "Quantidade": 0, "Dinheiro": 30, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Passaro", "Quantidade": 0, "Dinheiro": 30, "HasCheck": false },
    ]

let resultsdia = { "DinheiroDia": "0", "DinheiroTotal": "0" }

let queuelist = []

let countDownTime = 600;
let countDownPedido;
let hungerCount = 300;
let gameActive = true;

let a = 0;

//Functions começam aqui

//Função de iniciação que começa no onload,
function init() {
    console.log("test");

    getCurrentTime();

    ShopTimer(countDownTime);

    checkQuantities();

    AnimalFome();

    getUserLocal();

    getMoneyLocal();

    let animaisDiv = document.getElementById("zona_animals");
    let balcaoDiv = document.getElementById("zona_balcao");
    let racaoDiv = document.getElementById("zona_alimentacao");
    let tosquiaDiv = document.getElementById("zona_tosquias");

    animaisDiv.style.display = 'none';
    balcaoDiv.style.display = 'none';
    racaoDiv.style.display = 'none';
    tosquiaDiv.style.display = 'none';
}

function OpenZona(zona) {
    let animaisDiv = document.getElementById("zona_animals");
    let balcaoDiv = document.getElementById("zona_balcao");
    let racaoDiv = document.getElementById("zona_alimentacao");
    let tosquiaDiv = document.getElementById("zona_tosquias");

    if (zona === 'Animais') {
        animaisDiv.style.display = 'block';
        balcaoDiv.style.display = 'none';
        racaoDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';
    }
    else if (zona === 'Balcao') {
        balcaoDiv.style.display = 'block';
        racaoDiv.style.display = 'none';
        animaisDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';
    }
    else if (zona === 'Alimentacao') {
        racaoDiv.style.display = 'block';
        balcaoDiv.style.display = 'none';
        animaisDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';

    }
    else {
        tosquiaDiv.style.display = 'block';
        animaisDiv.style.display = 'none';
        balcaoDiv.style.display = 'none';
        racaoDiv.style.display = 'none';
    }

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
    //1000 é 1 segundo em millisegundos
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

    //Se a local storage do dinheiro não existe ainda
    if (dinheiroLocalStorage === null) {
        console.log("Novo Jogo");

        //JSONstrigification do dicionario resultsdia
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

//Função para o Timer da Petshop
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

//Função que começa o timer para o tempo limite do pedido do cliente
function pedidoTime() {

    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    let zonaPedidosDiv = document.getElementById("zona_pedidos");

    for (let i = 0; i < queuelist.length; i++) {
        console.log(queuelist[i].pedidoNum);

        var timer = setInterval(

            function () {
                queuelist[i].pedidoTime--;

                console.log(queuelist[i].pedidoId + ": " + queuelist[i].pedidoTime);

                if (queuelist[i].IsComplete === true) {
                    console.log("Abort CountDown");
                    clearInterval(timer);

                    queuelist.splice(i, 1);
                }
                else {
                    if (queuelist[i].pedidoTime === 0) {

                        clearInterval(timer);

                        alert("Oops, não acabaste o pedido a tempo. O cliente saiu insatisfeito.");

                        dinheiroDicionario.DinheiroDia = racaolist[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);

                        resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

                        let dinheiroProfile = JSON.stringify(resultsdia);

                        localStorage.setItem("Dinheiro", dinheiroProfile);
                        getMoneyLocal();

                        zonaPedidosDiv.removeChild(queuelist[i].pedidoId);

                        queuelist.splice(i, 1);
                    }
                }

            }, 2000)
    }
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

        for (let i = 0; i < animallist.length; i++) {
            const timer = setInterval(
                function () {
                    animallist[i].Hungy--;

                    //console.log(animallist[i].Tipo + ":" + animallist[i].Hungy);

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
                }, 1000);
        }
    }
}

function purchaseRacao(TipoRacao) {
    let i;

    for (i = 0; i < racaolist.length; i++) {
        if (TipoRacao === racaolist[i].Tipo) {
            racaolist[i].Quantidade = racaolist[i].Quantidade + 1;
            if (racaolist[i].Quantidade >= 1) {
                racaolist[i].Check = true;
            }
        }
    }
    console.log("Tens " + racaolist[i].Quantidade + " de racao de " + racaolist[i].Tipo);

    checkQuantities();
}

//Function para buscar a racao de um especifico animal
function getRacao(RacaoItem) {
    if (gameActive) {
        let i;

        for (i = 0; i < animallist.length; i++) {
            if (RacaoItem == racaolist[i].Tipo) {
                racaolist[i].Quantidade = racaolist[i].Quantidade - 1;

                if (racaolist[i].Quantidade == 0) {
                    wasteTime(racaolist[i].TaskTime);
                    racaolist[i].Check = false;
                }
            }
        }
        for (i = 3; i < inventory.length; i++) {
            if (RacaoItem === inventory[i].TipoAnimal) {
                inventory[i].Quantidade = inventory[i].Quantidade + 1;
                inventory[i].HasCheck = true;

                break;
            }
        }
        console.log("Tens " + inventory[i].Quantidade + " de racao de " + inventory[i].Nome);

        checkQuantities();
    }
}

function checkQuantities() {

    for (let i = 0; i < racaolist.length; i++) {
        let racaoSpan = document.getElementById("quantComida-" + racaolist[i].Tipo);

        racaoSpan.textContent = racaolist[i].Quantidade;
    }

    for (let i = 0; i < animallist.length; i++) {
        let animalSpan = document.getElementById("quantAnimal-" + animallist[i].Tipo);

        animalSpan.textContent = animallist[i].Quantidade;
    }
}

function purchaseAnimal(Animal) {
    for (let i = 0; i < animallist.length; i++) {
        if (Animal === animallist[i].Tipo) {
            animallist[i].Quantidade = animallist[i].Quantidade + 1;
            if (animallist[i].Quantidade >= 1) {
                animallist[i].Check = true;
            }
            break;
        }
    }
    checkQuantities();
}

//Function para buscar a comida especifica de um animal
function getAnimal(Animal) {
    if (gameActive) {
        let i

        for (i = 0; i < animallist.length; i++) {
            if (Animal == animallist[i].Tipo) {
                animallist[i].Quantidade = animallist[i].Quantidade - 1;
                wasteTime(animallist[i].GetTaskTime);

                if (animallist[i].Quantidade == 0) {
                    animallist[i].Check = false;
                }

                break;
            }
        }
        for (i = 0; i < inventory.length; i++) {
            if (Animal == inventory[i].TipoAnimal) {
                inventory[i].Quantidade = inventory[i].Quantidade + 1;
                inventory[i].HasCheck = true;

                break;
            }
        }
        console.log("Tens " + inventory[i].Quantidade + " " + inventory[i].TipoAnimal);

        checkQuantities();
    }
}

function tosquiarAnimal(Animal) {
    for (let i = 0; i < tosquiaStatus.length; i++) {


    }
}

function passearAnimal(Animal) {
    let i;

    for (i = 0; i < passeioStatus.length; i++) {

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
        //Genera um numero aleatorio entre 1 a 13
        let pedidoNumber = Math.floor(Math.random() * 13) + 1

        for (let i = 0; i < pedido.length; i++) {
            if (pedidoNumber === pedido[i].PedidoID) {
                console.log("O cliente pediu por:" + pedido[i].TipoPedido);

                //Cria um buttao, botao tem os parametros do tipo de pedido e tipo de animal
                let newPedido = document.createElement("Button");
                newPedido.setAttribute("id", "pedido" + a);
                newPedido.setAttribute("onclick", "giveOrder('pedido" + a + "','" + pedido[i].TipoPedido + "','" + pedido[i].TipoAnimal + "')");

                //Imagem vai para dentro do buttao
                let imgPedido = document.createElement("img");
                imgPedido.setAttribute("src", "./images/" + pedido[i].Imagem + ".png");
                imgPedido.setAttribute("alt", pedido[i].Imagem);

                zonaPedidosDiv.appendChild(newPedido);
                newPedido.appendChild(imgPedido);

                queuelist.push(
                    {
                        "pedidoNum": a,
                        "pedidoId": "pedido" + a,
                        "pedidoTime": pedido[i].Tempo,
                        "IsComplete": false,
                    }
                );
                pedidoTime();

                a++;

                //Acaba aqui para n fazer asneira
                break;
            }
        }
    }
}

//Função para dar Order ao Cliente
function giveOrder(PedidoID, Pedido, Animal) {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);
    let zonaPedidosDiv = document.getElementById("zona_pedidos");
    let currentOrder = zonaPedidosDiv.childNodes;

    let a;
    let i;

    let promptText = "De certeza que quer completar este pedido? Carregue OK se sim, carregue CANCEL se não";

    for (a = 0; a < queuelist.length; a++) {
        if (queuelist[a].pedidoId === PedidoID) {
            break;
        }
    }

    if (confirm(promptText)) {
        for (i = 0; i < inventory.length; i++) {
            //Verifica o tipo de Animal
            if (Pedido === inventory[i].Tipo && Animal === inventory[i].TipoAnimal) {
                //Verifica se tem o animal
                if (inventory[i].HasCheck == true) {
                    //Subtrai a quantidade que o jogador tem
                    inventory[i].Quantidade = inventory[i].Quantidade - 1;

                    //Soma o dinheiro
                    dinheiroDicionario.DinheiroDia = inventory[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);

                    //Se chegar a quantidade chegar a zero, o check fica falso
                    if (inventory[i].Quantidade === 0) {
                        inventory[i].HasCheck = false;
                    }

                    queuelist[a].IsComplete = true;

                    console.log("Sucessful Order");
                    break;
                }
                else {
                    console.log("Failed Order");
                    alert("Não tens o pedido do Cliente. O cliente não está satisfeito.");

                    //Subtrai o dinheiro
                    dinheiroDicionario.DinheiroDia = inventory[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);
                    break;
                }
            }
        }
        console.log("Tens " + inventory[i].Quantidade + " de " + inventory[i].Nome);

        console.log("Dinheiro Recebido: " + dinheiroDicionario.DinheiroDia);
        resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

        let dinheiroProfile = JSON.stringify(resultsdia);

        localStorage.setItem("Dinheiro", dinheiroProfile);
        getMoneyLocal();

        //Remove o pedido

        zonaPedidosDiv.removeChild(currentOrder[a]);
    }
}