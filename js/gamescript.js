//Dictionary Variables
let animallist =
    [
        { "Tipo": "Gato", "Quantidade": 5, "Dinheiro": 100, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 100, "Check": true },
        { "Tipo": "Cao", "Quantidade": 5, "Dinheiro": 100, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 100, "Check": true },
        { "Tipo": "Passaro", "Quantidade": 5, "Dinheiro": 100, "GetTaskTime": 30, "FeedTaskTime": 60, "Hungy": 100, "Check": true },
    ]

let racaolist =
    [
        { "Tipo": "Gato", "Quantidade": 10, "Dinheiro": 40, "TaskTime": 30, "Check": true },
        { "Tipo": "Cao", "Quantidade": 10, "Dinheiro": 40, "TaskTime": 30, "Check": true },
        { "Tipo": "Passaro", "Quantidade": 10, "Dinheiro": 40, "TaskTime": 30, "Check": true },
    ]

let tosquiaStatus = []

let banhoStatus = []

let passeioStatus = []

let pedido =
    [
        { "PedidoID": 1, "TipoPedido": "Racao", "TipoAnimal": "Cao", "Imagem": "RacaoCaoImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 2, "TipoPedido": "Racao", "TipoAnimal": "Gato", "Imagem": "RacaoGatoImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 3, "TipoPedido": "Racao", "TipoAnimal": "Passaro", "Imagem": "RacaoPassaroImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 4, "TipoPedido": "Adotar", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 5, "TipoPedido": "Adotar", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 6, "TipoPedido": "Adotar", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 7, "TipoPedido": "Tosquia", "TipoAnimal": "Cao", "Imagem": "TosquiarImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 8, "TipoPedido": "Tosquia", "TipoAnimal": "Gato", "Imagem": "TosquiarImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 9, "TipoPedido": "Tosquia", "TipoAnimal": "Passaro", "Imagem": "TosquiarImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 10, "TipoPedido": "Banho", "TipoAnimal": "Cao", "Imagem": "BanhoImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 11, "TipoPedido": "Banho", "TipoAnimal": "Gato", "Imagem": "BanhoImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 12, "TipoPedido": "Banho", "TipoAnimal": "Passaro", "Imagem": "BanhoImg", "Tempo": 30, "Dinheiro": 70 },
        { "PedidoID": 13, "TipoPedido": "Passeio", "TipoAnimal": "Cao", "Imagem": "PasseioImg", "Tempo": 30, "Dinheiro": 70 },
    ]

let inventory =
    [
        { "Tipo": "Adotar", "TipoAnimal": "Cao", "Quantidade": 0, "Dinheiro": 100, "HasCheck": false },
        { "Tipo": "Adotar", "TipoAnimal": "Gato", "Quantidade": 0, "Dinheiro": 100, "HasCheck": false },
        { "Tipo": "Adotar", "TipoAnimal": "Passaro", "Quantidade": 0, "Dinheiro": 100, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Cao", "Quantidade": 0, "Dinheiro": 100, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Gato", "Quantidade": 0, "Dinheiro": 100, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Passaro", "Quantidade": 0, "Dinheiro": 100, "HasCheck": false },
    ]

let resultsdia = { "DinheiroDia": 0, "DinheiroTotal": 0 }

let queuelist = []

let countDownTime = 600;
let countDownPedido;
let hungerCount = 300;
let gameActive = false;

let a = 0;

//Functions começam aqui

//Função de iniciação que começa no onload,
function init() {
    getCurrentTime();

    getUserLocal();

    getMoneyLocal();

    let zona_jogocontainer = document.getElementById("jogo_section");

    zona_jogocontainer.style.display = 'none';
}

function beginGame() {
    gameActive = true;

    ShopTimer(countDownTime);

    MostrarTosquiaList();

    MostrarBanhosList();

    MostrarPasseiosList();

    checkQuantities();

    AnimalFome();

    let not_jogoContainer = document.getElementById("notjogo_section")
    let jogoContainer = document.getElementById("jogo_section");
    let animaisDiv = document.getElementById("zona_animals");
    let balcaoDiv = document.getElementById("zona_balcao");
    let racaoDiv = document.getElementById("zona_alimentacao");
    let tosquiaDiv = document.getElementById("zona_tosquias");
    let passeiosDiv = document.getElementById("zona_passeios");

    not_jogoContainer.style.display = 'none';

    jogoContainer.style.display = 'block';
    animaisDiv.style.display = 'none';
    balcaoDiv.style.display = 'none';
    racaoDiv.style.display = 'none';
    tosquiaDiv.style.display = 'none';
    passeiosDiv.style.display = 'none';
}

function endGame() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    resultsdia.DinheiroTotal = dinheiroDicionario.DinheiroDia + dinheiroDicionario.DinheiroDia;
    resultsdia.DinheiroDia = 0;
    let dinheiroProfile = JSON.stringify(resultsdia);
    localStorage.setItem("Dinheiro", dinheiroProfile);
    getMoneyLocal();

    location.reload();
}

function OpenZona(zona) {
    let animaisDiv = document.getElementById("zona_animals");
    let balcaoDiv = document.getElementById("zona_balcao");
    let racaoDiv = document.getElementById("zona_alimentacao");
    let tosquiaDiv = document.getElementById("zona_tosquias");
    let passeiosDiv = document.getElementById("zona_passeios");

    if (zona === 'Animais') {
        animaisDiv.style.display = 'block';
        balcaoDiv.style.display = 'none';
        racaoDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';
        passeiosDiv.style.display = 'none';
    }
    else if (zona === 'Balcao') {
        balcaoDiv.style.display = 'block';
        racaoDiv.style.display = 'none';
        animaisDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';
        passeiosDiv.style.display = 'none';
    }
    else if (zona === 'Alimentacao') {
        racaoDiv.style.display = 'block';
        balcaoDiv.style.display = 'none';
        animaisDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';
        passeiosDiv.style.display = 'none';
    }
    else if (zona === 'Tosquias') {
        tosquiaDiv.style.display = 'block';
        animaisDiv.style.display = 'none';
        balcaoDiv.style.display = 'none';
        racaoDiv.style.display = 'none';
        passeiosDiv.style.display = 'none';
    }
    else if (zona === 'Passeios') {
        passeiosDiv.style.display = 'block'
        animaisDiv.style.display = 'none';
        balcaoDiv.style.display = 'none';
        racaoDiv.style.display = 'none';
        tosquiaDiv.style.display = 'none';
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
        window.location.replace("loginpage.html");
    }
    else {
        let profileDicionario = JSON.parse(profileLocalStorage);
        document.getElementById("txt_username").textContent = profileDicionario.name;
    }
}

function getMoneyLocal() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");

    //Se a local storage do dinheiro não existe ainda
    if (dinheiroLocalStorage === null) {
        //JSONstrigification do dicionario resultsdia
        let dinheiroProfile = JSON.stringify(resultsdia);

        localStorage.setItem("Dinheiro", dinheiroProfile);
    }
    else {
        let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

        if (dinheiroDicionario.DinheiroDia < 0) {
            dinheiroDicionario.DinheiroDia = 0
            resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;
            resultsdia.DinheiroTotal = dinheiroDicionario.DinheiroTotal;

        }
        else {
            resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;
            resultsdia.DinheiroTotal = dinheiroDicionario.DinheiroTotal;
        }


        document.getElementById("dinheiroHoje").textContent = dinheiroDicionario.DinheiroDia + "€";
        document.getElementById("dinheiroTotal").textContent = dinheiroDicionario.DinheiroTotal + "€ total";
    }
}

//Função para o Timer da Petshop
function ShopTimer() {
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
                clearInterval(timer);
                document.getElementById("gameTime").textContent = "00:00 - Tempo Acabou!";

                alert("Time's up! Hora de fechar a loja!");

                gameActive = false;
                endGame();
            }
        }, 1000)
}

//Função que começa o timer para o tempo limite do pedido do cliente, chamada após a função pedidoBalcao é executada
function pedidoTime() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    let zonaPedidosDiv = document.getElementById("zona_pedidos");

    //Percorre o array onde os pedidos estão armazenados
    for (let i = 0; i < queuelist.length; i++) {
        //i e armazenada nesta função anonima para não se perder no setIntervals
        (function (i) {
            const timer = setInterval(function () {
                if (gameActive) {
                    if (queuelist[i] != null) {
                        //currentOrder seria o child node da zonaPedidosDiv
                        let currentOrder = document.getElementById(queuelist[i].pedidoId);

                        let timeSpan = document.getElementById(queuelist[i].pedidoTimeID);

                        //Subtrai o tempo de cada pedido
                        queuelist[i].pedidoTime--;

                        //Para a span de timer dos pedidos
                        timeSpan.textContent = queuelist[i].pedidoTime;

                        //Se o pedido foi completado
                        if (queuelist[i].IsComplete == true) {
                            clearInterval(timer);

                            zonaPedidosDiv.removeChild(currentOrder);
                            queuelist.splice(i, 1);
                            return;
                        }
                        else {
                            if (queuelist[i].pedidoTime === 0) {
                                clearInterval(timer);

                                dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) - queuelist[i].Dinheiro;

                                resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

                                let dinheiroProfile = JSON.stringify(resultsdia);

                                localStorage.setItem("Dinheiro", dinheiroProfile);
                                getMoneyLocal();

                                ApagarTableCell(queuelist[i].pedidoTipo, queuelist[i].pedidoId);
                                zonaPedidosDiv.removeChild(currentOrder);
                                queuelist.splice(i, 1);

                                alert("Oops, não acabaste o pedido a tempo. O cliente saiu insatisfeito.");

                                return;
                            }
                        }
                    }
                }
                else {
                    clearInterval(timer);
                }
            }, 3000)
        })(i);
    }
}

function ApagarTableCell(tipoPedido, pedidoID) {
    let c;

    if (tipoPedido === "Tosquia") {
        for (c = 0; c < tosquiaStatus.length; c++) {
            if (pedidoID == tosquiaStatus[c].tosquiaId) {
                break;
            }
        }
        tosquiaStatus.splice(c, 1);
        clearListaTosquia();
        MostrarTosquiaList();
    }
    else if (tipoPedido === "Banho") {
        for (c = 0; c < banhoStatus.length; c++) {
            if (pedidoID == banhoStatus[c].banhoId) {
                break;
            }
        }
        banhoStatus.splice(c, 1);
        clearListaBanhos();
        MostrarBanhosList();
    }
    else if (tipoPedido === "Passeio") {
        for (c = 0; c < passeioStatus.length; c++) {
            if (pedidoID == passeioStatus[c].passeioId) {
                break;
            }
        }
        passeioStatus.splice(c, 1);
        clearListaPasseios();
        MostrarPasseiosList();
    }
    else {
        return;
    }
}

//Function para gastar o tempo entre atividades
function wasteTime(taskTime) {
    countDownTime = countDownTime - taskTime;
}

//Function para contar a fome dos animais no jogo
function AnimalFome() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    for (let i = 0; i < animallist.length; i++) {
        const timer = setInterval(
            function () {
                if (!gameActive) {
                    clearInterval(timer);
                }
                else {
                    if(animallist[i].Check == true)
                    {
                        animallist[i].Hungy -= 1;

                        let hungerbar = document.getElementById("hungerbar_" + animallist[i].Tipo);
                        let hungerperc = document.getElementById("percent_" + animallist[i].Tipo);
    
                        if (animallist[i].Hungy >= 100) {
                            animallist[i].Hungy = 100;
                        }
    
                        if (animallist[i].Hungy === 0) {
                            alert("Um dos teus " + animallist[i].Tipo + " adoeçeu por causa de fome. Foi Mandado para o hospital. A gerenciâ está infeliz, por isso vai te custar.");
    
                            animallist[i].Quantidade = animallist[i].Quantidade - 1;
    
                            dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) - racaolist[i].Dinheiro;
    
                            resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;
    
                            let dinheiroProfile = JSON.stringify(resultsdia);
    
                            localStorage.setItem("Dinheiro", dinheiroProfile);
                            getMoneyLocal();
    
                            animallist[i].Hungy = 100;
    
                            checkQuantities();
                        }
                        hungerbar.style.width = animallist[i].Hungy + '%';
                        hungerperc.textContent = animallist[i].Hungy + "%";
                    }
                    else
                    {
                        animal[i].Hungy = 100;
                        clearInterval(timer);
                    }
                }
                    
            }, 1000)
    }
}

function purchaseRacao(TipoRacao) {
    let i;
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    for (i = 0; i < racaolist.length; i++) {
        if (TipoRacao === racaolist[i].Tipo) {
            //Se a subtracao for menor que zero...
            if (parseInt(dinheiroDicionario.DinheiroDia) - racaolist[i].Dinheiro < 0) {
                alert("Não tem dinheiro suficiente para encomendar esta Ração");
                break;
            }
            else {
                dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) - racaolist[i].Dinheiro;
                racaolist[i].Quantidade = racaolist[i].Quantidade + 1;
                if (racaolist[i].Quantidade >= 1) {
                    racaolist[i].Check = true;
                }
                break;
            }
        }
    }
    resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;
    let dinheiroProfile = JSON.stringify(resultsdia);

    localStorage.setItem("Dinheiro", dinheiroProfile);
    checkQuantities();
    getMoneyLocal();
}

//Function para buscar a racao de um especifico animal
function getRacao(RacaoItem) {
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
    checkQuantities();
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
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    for (let i = 0; i < animallist.length; i++) {
        if (Animal === animallist[i].Tipo) {
            if (parseInt(dinheiroDicionario.DinheiroDia) - animallist[i].Dinheiro < 0) {
                alert("Não tem dinheiro suficiente para encomendar este Animal");
                break;
            }
            else {
                dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) - animallist[i].Dinheiro;
                animallist[i].Quantidade = animallist[i].Quantidade + 1;
                if (animallist[i].Quantidade >= 1) {
                    animallist[i].Check = true;
                }
                break;
            }
        }
    }

    resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;
    let dinheiroProfile = JSON.stringify(resultsdia);

    localStorage.setItem("Dinheiro", dinheiroProfile);
    checkQuantities();
    getMoneyLocal();
}

//Function para buscar um animal
function getAnimal(Animal) {
    let i

    for (i = 0; i < animallist.length; i++) {
        if (Animal == animallist[i].Tipo) {
            if (animallist[i].Check == true) {
                animallist[i].Quantidade = animallist[i].Quantidade - 1;
                wasteTime(animallist[i].GetTaskTime);

                if (animallist[i].Quantidade == 0) {
                    animallist[i].Check = false;
                }

                break;
            }
        }
    }

    for (i = 0; i < inventory.length; i++) {
        if (Animal == inventory[i].TipoAnimal) {
            inventory[i].Quantidade = inventory[i].Quantidade + 1;
            inventory[i].HasCheck = true;

            break;
        }
    }

    checkQuantities();
}

function tosquiarAnimal(numId) {
    let promptText = "Quer tosquiar este animal?"

    if (confirm(promptText)) {
        for (let i = 0; i < tosquiaStatus.length; i++) {
            if (numId == tosquiaStatus[i].tosquiaNum) {
                tosquiaStatus[i].IsComplete = true;

                wasteTime(tosquiaStatus[i].TaskTime);
                alert("O animal foi tosqueado!");

                break;
            }
        }
        clearListaTosquia();
        MostrarTosquiaList();
    }
}

function lavarAnimal(numId) {
    let promptText = "Quer lavar este animal?";

    if (confirm(promptText)) {
        for (let i = 0; i < banhoStatus.length; i++) {
            if (numId == banhoStatus[i].banhoNum) {
                banhoStatus[i].IsComplete = true;

                wasteTime(banhoStatus[i].TaskTime);

                alert("O animal foi lavado!");

                break;
            }
        }
        clearListaBanhos();
        MostrarBanhosList();
    }
}

function passearAnimal(numId) {
    let promptText = "Quer passear este animal?";

    if (confirm(promptText)) {
        for (let i = 0; i < passeioStatus.length; i++) {
            if (numId == passeioStatus[i].passeioNum) {
                passeioStatus[i].IsComplete = true;

                wasteTime(passeioStatus[i].TaskTime);

                alert("O animal foi passeado!");

                break;
            }
        }
        clearListaPasseios();
        MostrarPasseiosList();
    }
}

//Função para alimentar os animais.
function feedAnimal(Animal) {
    let promptText = "Pretende começar o processo de alimentação do " + Animal + "? Carregue OK se sim, carregue CANCEL se não";

    if (confirm(promptText)) {
        for (let i = 3; i < inventory.length; i++) {
            if (Animal === inventory[i].TipoAnimal) {
                if (inventory[i].HasCheck == true) {
                    inventory[i].Quantidade = inventory[i].Quantidade - 1;
                    if (inventory[i].Quantidade === 0) {
                        inventory[i].HasCheck = false;
                    }
                    animalFed(Animal);
                    break;
                }
                else {
                    alert("Não tem a ração do " + Animal + ".");
                    break;
                }
            }
        }
    }
}

function animalFed(Animal) {
    for (let b = 0; b < animallist.length; b++) {
        if (Animal === animallist[b].Tipo) {
            wasteTime(animallist[b].FeedTaskTime);

            animallist[b].Hungy = animallist[b].Hungy + 50;

            alert(Animal + " alimentado com sucesso!");
            break;
        }
    }
}

//Função para fazer os pedidos de Balcão
function pedidoBalcao() {
    //Div exclusivamente para por pedidos la no html
    let zonaPedidosDiv = document.getElementById("zona_pedidos");

    if (zonaPedidosDiv.childNodes.length > 3) {
        alert("Não pode ter mais que 3 pedidos");
    }
    else {
        //Genera um numero aleatorio entre 1 a 13
        let pedidoNumber = Math.floor(Math.random() * 13) + 1

        for (let i = 0; i < pedido.length; i++) {
            if (pedidoNumber === pedido[i].PedidoID) {
                console.log("O cliente pediu por:" + pedido[i].TipoPedido);

                let pedidoContainer = document.createElement("div");
                pedidoContainer.setAttribute("id", "pedido" + a)
                pedidoContainer.setAttribute("class", "pedido_container")

                let imgContainer = document.createElement("div");
                imgContainer.setAttribute("id", "image" + a);

                //Imagem vai para a tabela   
                let imgPedido = document.createElement("img");
                imgPedido.setAttribute("src", "./images/" + pedido[i].Imagem + ".png");
                imgPedido.setAttribute("alt", pedido[i].Imagem);
                imgPedido.setAttribute("class", pedido[i].TipoPedido);

                let numContainer = document.createElement("div");
                numContainer.setAttribute("id", "numContainer" + a);
                numContainer.textContent = a;

                let tipoContainer = document.createElement("div");
                tipoContainer.setAttribute("id", "tipoContainer" + a);
                tipoContainer.textContent = "Tipo de Pedido: " + pedido[i].TipoPedido + " de " + pedido[i].TipoAnimal;

                let timelimitSpan = document.createElement("span");
                timelimitSpan.setAttribute("id", "timeLimit" + a);
                timelimitSpan.textContent = pedido[i].Tempo;

                let timeContainer = document.createElement("div");
                timeContainer.setAttribute("id", "timeContainer" + a);
                timeContainer.textContent = "Tempo Limite: ";

                let statusContainer = document.createElement("div");
                statusContainer.setAttribute("id", "statusContainer" + a);
                statusContainer.textContent = "Status: Pending";

                let buttonContainer = document.createElement("div");

                //Cria um buttao, botao tem os parametros do tipo de pedido e tipo de animal
                let buttonPedido = document.createElement("Button");
                buttonPedido.setAttribute("onclick", "giveOrder('pedido" + a + "','" + pedido[i].TipoPedido + "','" + pedido[i].TipoAnimal + "')");
                buttonPedido.textContent = "Terminar Pedido";

                queuelist.push(
                    {
                        "pedidoNum": a,
                        "pedidoTimeID": "timeLimit" + a,
                        "pedidoTipo": pedido[i].TipoPedido,
                        "PedidoAnimal": pedido[i].TipoAnimal,
                        "pedidoId": "pedido" + a,
                        "Dinheiro": pedido[i].Dinheiro,
                        "pedidoTime": pedido[i].Tempo,
                        "IsComplete": false,
                    }
                );

                if (pedido[i].TipoPedido === 'Tosquia') {
                    tosquiaStatus.push(
                        {
                            "tosquiaNum": a,
                            "tosquiaId": "pedido" + a,
                            "Tipo": pedido[i].TipoAnimal,
                            "TaskTime": 30,
                            "Dinheiro": 100,
                            "IsComplete": false,
                        }
                    )
                    clearListaTosquia();
                    MostrarTosquiaList();
                }
                else if (pedido[i].TipoPedido === 'Banho') {
                    banhoStatus.push(
                        {
                            "banhoNum": a,
                            "banhoId": "pedido" + a,
                            "Tipo": pedido[i].TipoAnimal,
                            "TaskTime": 30,
                            "Dinheiro": 100,
                            "IsComplete": false,
                        }
                    )
                    clearListaBanhos();
                    MostrarBanhosList();
                }
                else if (pedido[i].TipoPedido === 'Passeio') {
                    passeioStatus.push(
                        {
                            "passeioNum": a,
                            "passeioId": "pedido" + a,
                            "Tipo": pedido[i].TipoAnimal,
                            "TaskTime": 30,
                            "Dinheiro": 100,
                            "IsComplete": false,
                        }
                    )
                    clearListaPasseios();
                    MostrarPasseiosList();
                }

                zonaPedidosDiv.appendChild(pedidoContainer);
                pedidoContainer.appendChild(imgContainer);
                pedidoContainer.appendChild(numContainer);
                pedidoContainer.appendChild(tipoContainer);
                pedidoContainer.appendChild(timeContainer);
                timeContainer.appendChild(timelimitSpan);
                pedidoContainer.appendChild(statusContainer);
                pedidoContainer.appendChild(buttonContainer);
                imgContainer.appendChild(imgPedido);
                buttonContainer.appendChild(buttonPedido);

                pedidoTime();

                a++;

                //Acaba aqui para n fazer asneira
                break;
            }
        }
    }
}

function clearListaTosquia() {
    let tosquiasdiv = document.getElementById("tosquias_tablecontainer");
    tosquiasdiv.textContent = "";
}

function clearListaBanhos() {
    let banhosdiv = document.getElementById("banhos_tablecontainer");
    banhosdiv.textContent = "";
}

function clearListaPasseios() {
    let passeiosdiv = document.getElementById("passeios_tablecontainer");
    passeiosdiv.textContent = "";
}

function MostrarTosquiaList() {
    let tosquiasdiv = document.getElementById("tosquias_tablecontainer");

    if (tosquiaStatus.length > 0) {
        let tabela = document.createElement("table");
        tabela.setAttribute("id", "tabela_tosquia");

        let headerRow = document.createElement("tr");
        let numHeader = document.createElement("th");
        numHeader.textContent = "Numero";

        let tipoHeader = document.createElement("th");
        tipoHeader.textContent = "Animal";

        let tempoHeader = document.createElement("th");
        tempoHeader.textContent = "Duração";

        let statusHeader = document.createElement("th");
        statusHeader.textContent = "Tosqueado?";

        let buttonHeader = document.createElement("th");
        buttonHeader.setAttribute("class", "no_border");

        tosquiasdiv.appendChild(tabela);
        tabela.appendChild(headerRow);
        headerRow.appendChild(numHeader);
        headerRow.appendChild(tipoHeader);
        headerRow.appendChild(tempoHeader);
        headerRow.appendChild(statusHeader);
        headerRow.appendChild(buttonHeader);

        for (let i = 0; i < tosquiaStatus.length; i++) {
            let rows = document.createElement("tr");

            let animalNum = document.createElement("td");
            animalNum.textContent = tosquiaStatus[i].tosquiaNum;

            let animalTipo = document.createElement("td");
            animalTipo.textContent = tosquiaStatus[i].Tipo;

            let animalTempo = document.createElement("td");
            animalTempo.textContent = tosquiaStatus[i].TaskTime;

            let animalStatus = document.createElement("td");

            let animalButton = document.createElement("td");
            let tosquiaButton = document.createElement("button");
            tosquiaButton.setAttribute("onclick", "tosquiarAnimal('" + tosquiaStatus[i].tosquiaNum + "')");
            tosquiaButton.setAttribute("class", "table_buttons");
            animalButton.setAttribute("class", "no_border");
            tosquiaButton.textContent = "Tosquiar Animal";

            if (tosquiaStatus[i].IsComplete == false) {
                animalStatus.textContent = "Não";
                tosquiaButton.disabled = false;
            }
            else {
                animalStatus.textContent = "Sim";
                tosquiaButton.disabled = true;
            }

            tabela.appendChild(rows);
            rows.appendChild(animalNum);
            rows.appendChild(animalTipo);
            rows.appendChild(animalTempo);
            rows.appendChild(animalStatus);
            rows.appendChild(animalButton);
            animalButton.appendChild(tosquiaButton);
        }
    }
    else {
        tosquiasdiv.textContent = "Não tem Animais para Tosquiar."
    }
}

function MostrarBanhosList() {
    let banhosdiv = document.getElementById("banhos_tablecontainer");

    if (banhoStatus.length > 0) {
        let tabela = document.createElement("table");
        tabela.setAttribute("id", "tabela_banho");

        let headerRow = document.createElement("tr");
        let numHeader = document.createElement("th");
        numHeader.textContent = "Numero";

        let tipoHeader = document.createElement("th");
        tipoHeader.textContent = "Animal";

        let tempoHeader = document.createElement("th");
        tempoHeader.textContent = "Duração";

        let statusHeader = document.createElement("th");
        statusHeader.textContent = "Lavado?";

        let buttonHeader = document.createElement("th");
        buttonHeader.setAttribute("class", "no_border");

        banhosdiv.appendChild(tabela);
        tabela.appendChild(headerRow);
        headerRow.appendChild(numHeader);
        headerRow.appendChild(tipoHeader);
        headerRow.appendChild(tempoHeader);
        headerRow.appendChild(statusHeader);
        headerRow.appendChild(buttonHeader);

        for (let i = 0; i < banhoStatus.length; i++) {
            let rows = document.createElement("tr");

            let animalNum = document.createElement("td");
            animalNum.textContent = banhoStatus[i].banhoNum;

            let animalTipo = document.createElement("td");
            animalTipo.textContent = banhoStatus[i].Tipo;

            let animalTempo = document.createElement("td");
            animalTempo.textContent = banhoStatus[i].TaskTime;

            let animalStatus = document.createElement("td");

            let animalButton = document.createElement("td");
            let banhoButton = document.createElement("button");
            banhoButton.setAttribute("onclick", "lavarAnimal('" + banhoStatus[i].banhoNum + "')");
            banhoButton.setAttribute("class", "table_buttons");
            animalButton.setAttribute("class", "no_border");
            banhoButton.textContent = "Lavar Animal";

            if (banhoStatus[i].IsComplete == false) {
                animalStatus.textContent = "Não";
                banhoButton.disabled = false;
            }
            else {
                animalStatus.textContent = "Sim";
                banhoButton.disabled = true;
            }

            tabela.appendChild(rows);
            rows.appendChild(animalNum);
            rows.appendChild(animalTipo);
            rows.appendChild(animalTempo);
            rows.appendChild(animalStatus);
            rows.appendChild(animalButton);
            animalButton.appendChild(banhoButton);
        }
    }
    else {
        banhosdiv.textContent = "Não tem Animais para lavar."
    }
}

function MostrarPasseiosList() {
    let passeiosDiv = document.getElementById("passeios_tablecontainer");

    if (passeioStatus.length > 0) {
        let tabela = document.createElement("table");
        tabela.setAttribute("id", "tabela_passeios");
        let headerRow = document.createElement("tr");
        let numHeader = document.createElement("th");
        numHeader.textContent = "Numero";

        let tipoHeader = document.createElement("th");
        tipoHeader.textContent = "Animal";

        let tempoHeader = document.createElement("th");
        tempoHeader.textContent = "Duração";

        let statusHeader = document.createElement("th");
        statusHeader.textContent = "Passeiado?";

        let buttonHeader = document.createElement("th");
        buttonHeader.setAttribute("class", "no_border");

        passeiosDiv.appendChild(tabela);
        tabela.appendChild(headerRow);
        headerRow.appendChild(numHeader);
        headerRow.appendChild(tipoHeader);
        headerRow.appendChild(tempoHeader);
        headerRow.appendChild(statusHeader);
        headerRow.appendChild(buttonHeader);

        for (let i = 0; i < passeioStatus.length; i++) {
            let rows = document.createElement("tr");

            let animalNum = document.createElement("td");
            animalNum.textContent = passeioStatus[i].passeioNum;

            let animalTipo = document.createElement("td");
            animalTipo.textContent = passeioStatus[i].Tipo;

            let animalTempo = document.createElement("td");
            animalTempo.textContent = passeioStatus[i].TaskTime;

            let animalStatus = document.createElement("td");

            let animalButton = document.createElement("td");
            animalButton.setAttribute("class", "no_border");
            let passeioButton = document.createElement("button");

            if (passeioStatus[i].IsComplete == false) {
                animalStatus.textContent = "Não";
                passeioButton.disabled = false;
            }
            else {
                animalStatus.textContent = "Sim";
                passeioButton.disabled = true;
            }

            passeioButton.setAttribute("onclick", "passearAnimal('" + passeioStatus[i].passeioNum + "')");
            passeioButton.setAttribute("class", "table_buttons");
            passeioButton.textContent = "Passear Animal";

            tabela.appendChild(rows);
            rows.appendChild(animalNum);
            rows.appendChild(animalTipo);
            rows.appendChild(animalTempo);
            rows.appendChild(animalStatus);
            rows.appendChild(animalButton);
            animalButton.appendChild(passeioButton);
        }
    }
    else {
        passeiosDiv.textContent = "Não tem animais para passear.";
    }
}

//Função para dar Order ao Cliente
function giveOrder(PedidoID, Pedido, Animal) {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    let b;
    let i;

    let promptText = "De certeza que quer completar este pedido? Carregue OK se sim, carregue CANCEL se não";

    for (b = 0; b < queuelist.length; b++) {
        if (queuelist[b].pedidoId === PedidoID) {
            break;
        }
    }

    if (confirm(promptText)) {
        if (Pedido === "Adotar" || Pedido === "Racao") {
            for (i = 0; i < inventory.length; i++) {
                //Verifica se o pedido é de ração ou de adoção
                if (Pedido === inventory[i].Tipo && Animal === inventory[i].TipoAnimal) {
                    //Verifica se o jogador tem o item do cliente
                    if (inventory[i].HasCheck == true) {
                        //Subtrai a quantidade que o jogador tem
                        inventory[i].Quantidade = inventory[i].Quantidade - 1;

                        //Soma o dinheiro
                        dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) + inventory[i].Dinheiro;

                        //Se chegar a quantidade chegar a zero, o check fica falso
                        if (inventory[i].Quantidade === 0) {
                            inventory[i].HasCheck = false;
                        }

                        queuelist[b].IsComplete = true;

                        console.log("Sucessful Order");
                        alert("Bom trabalho! O pedido foi feito com sucesso!");
                        break;
                    }
                    else {
                        console.log("Failed Order");
                        alert("Afinal não tinhas o pedido do Cliente. O cliente não está satisfeito com isto e saí da loja.");
                        queuelist[b].IsComplete = true;

                        //Subtrai o dinheiro
                        dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) - inventory[i].Dinheiro;
                        break;
                    }
                }
            }
            console.log("Tens " + inventory[i].Quantidade + " de " + inventory[i].Nome);
        }
        else if (Pedido === "Tosquia") {
            for (let i = 0; i < tosquiaStatus.length; i++) {
                console.log(tosquiaStatus[i].tosquiaId);
                if (PedidoID === tosquiaStatus[i].tosquiaId) {
                    if (tosquiaStatus[i].IsComplete === true) {
                        console.log("Sucessful Order");

                        dinheiroDicionario.DinheiroDia = tosquiaStatus[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);
                        queuelist[b].IsComplete = true;

                        tosquiaStatus.splice(i, 1);
                        clearListaTosquia();
                        MostrarTosquiaList();

                        alert("Bom trabalho! O pedido foi feito com sucesso!");
                        break;
                    }
                    else {
                        console.log("Failed Order");

                        dinheiroDicionario.DinheiroDia = tosquiaStatus[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);
                        queuelist[b].IsComplete = true;

                        tosquiaStatus.splice(i, 1);
                        clearListaTosquia();
                        MostrarTosquiaList();

                        alert("Afinal não tinhas o pedido do Cliente. O cliente não está satisfeito com isto e saí da loja.");
                        break;
                    }
                }
            }
        }
        else if (Pedido === "Banho") {
            for (let i = 0; i < banhoStatus.length; i++) {
                console.log(banhoStatus[i].banhoId);
                if (PedidoID === banhoStatus[i].banhoId) {
                    if (banhoStatus[i].IsComplete === true) {
                        console.log("Sucessful Order");

                        dinheiroDicionario.DinheiroDia = banhoStatus[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);
                        queuelist[b].IsComplete = true;

                        banhoStatus.splice(i, 1);
                        clearListaBanhos();
                        MostrarBanhosList();

                        alert("Bom trabalho! O pedido foi feito com sucesso!");
                        break;
                    }
                    else {
                        console.log("Failed Order");

                        dinheiroDicionario.DinheiroDia = banhoStatus[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);
                        queuelist[b].IsComplete = true;

                        banhoStatus.splice(i, 1);
                        clearListaBanhos();
                        MostrarBanhosList();

                        alert("Afinal não tinhas o pedido do Cliente. O cliente não está satisfeito com isto e saí da loja.");
                        break;
                    }
                }
            }
        }
        else if (Pedido === "Passeio") {
            for (let i = 0; i < passeioStatus.length; i++) {
                if (PedidoID === passeioStatus[i].passeioId) {
                    if (passeioStatus[i].IsComplete == true) {
                        dinheiroDicionario.DinheiroDia = passeioStatus[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);
                        queuelist[b].IsComplete = true;

                        passeioStatus.splice(i, 1);
                        clearListaPasseios();
                        MostrarPasseiosList();

                        alert("Bom trabalho! O pedido foi feito com sucesso!");
                        break;
                    }
                    else {
                        console.log("Failed Order");

                        dinheiroDicionario.DinheiroDia = passeioStatus[i].Dinheiro - parseInt(dinheiroDicionario.DinheiroDia);
                        queuelist[b].IsComplete = true;

                        passeioStatus.splice(i, 1);
                        clearListaPasseios();
                        MostrarPasseiosList();

                        alert("Afinal não tinhas o pedido do Cliente. O cliente não está satisfeito com isto e saí da loja.");
                        break;
                    }
                }
            }
        }
        resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

        let dinheiroProfile = JSON.stringify(resultsdia);

        localStorage.setItem("Dinheiro", dinheiroProfile);
        getMoneyLocal();
    }
}