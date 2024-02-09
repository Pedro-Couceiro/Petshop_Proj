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

let tosquiaStatus = []

let banhoStatus = []

let passeioStatus = []

let pedido =
    [
        { "PedidoID": 1, "TipoPedido": "Racao", "TipoAnimal": "Cao", "Imagem": "RacaoCaoImg", "Tempo": 60, "Dinheiro": 30 },
        { "PedidoID": 2, "TipoPedido": "Racao", "TipoAnimal": "Gato", "Imagem": "RacaoGatoImg", "Tempo": 60, "Dinheiro": 30 },
        { "PedidoID": 3, "TipoPedido": "Racao", "TipoAnimal": "Passaro", "Imagem": "RacaoPassaroImg", "Tempo": 60, "Dinheiro": 30 },
        { "PedidoID": 4, "TipoPedido": "Adotar", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 60, "Dinheiro": 150 },
        { "PedidoID": 5, "TipoPedido": "Adotar", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo": 60, "Dinheiro": 150 },
        { "PedidoID": 6, "TipoPedido": "Adotar", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo": 60, "Dinheiro": 150 },
        { "PedidoID": 7, "TipoPedido": "Tosquia", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 60, "Dinheiro": 70 },
        { "PedidoID": 8, "TipoPedido": "Tosquia", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo": 60, "Dinheiro": 70 },
        { "PedidoID": 9, "TipoPedido": "Tosquia", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo": 60, "Dinheiro": 70 },
        { "PedidoID": 10, "TipoPedido": "Banho", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 60, "Dinheiro": 70 },
        { "PedidoID": 11, "TipoPedido": "Banho", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo": 60, "Dinheiro": 70 },
        { "PedidoID": 12, "TipoPedido": "Banho", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo": 60, "Dinheiro": 70 },
        { "PedidoID": 13, "TipoPedido": "Passeio", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo": 60, "Dinheiro": 70 },
    ]

let inventory =
    [
        { "Tipo": "Adotar", "TipoAnimal": "Cao", "Quantidade": 0, "Dinheiro": 150, "HasCheck": false },
        { "Tipo": "Adotar", "TipoAnimal": "Gato", "Quantidade": 0, "Dinheiro": 150, "HasCheck": false },
        { "Tipo": "Adotar", "TipoAnimal": "Passaro", "Quantidade": 0, "Dinheiro": 150, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Cao", "Quantidade": 0, "Dinheiro": 30, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Gato", "Quantidade": 0, "Dinheiro": 30, "HasCheck": false },
        { "Tipo": "Racao", "TipoAnimal": "Passaro", "Quantidade": 0, "Dinheiro": 30, "HasCheck": false },
    ]

let resultsdia = { "DinheiroDia": 0, "DinheiroTotal": 0 }

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

    MostrarTosquiaList();

    MostrarBanhosList();

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
    let passeiosDiv = document.getElementById("zona_passeios");

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
    else if (zona === 'Tosquias') {
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

//Função que começa o timer para o tempo limite do pedido do cliente, chamada após a função pedidoBalcao é executada
function pedidoTime() {
    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    let zonaPedidosDiv = document.getElementById("zona_pedidos");

    //Percorre o array com os pedidos
    for (let i = 0; i < queuelist.length; i++) {
        //i e armazenada nesta função anonima para não se perder no setIntervals
        (function (i) {
            const timer = setInterval(function () {
                //currentOrder seria o child node da zonaPedidosDiv

                //Subtrai o tempo de cada pedido
                if (queuelist[i] != null) {
                    let currentOrder = document.getElementById(queuelist[i].pedidoId);
                    queuelist[i].pedidoTime--;

                    console.log(queuelist[i].pedidoId + ": " + queuelist[i].pedidoTime);

                    //Se o pedido foi completado
                    if (queuelist[i].IsComplete == true) {
                        console.log("Abort CountDown");
                        clearInterval(timer);

                        zonaPedidosDiv.removeChild(currentOrder);
                        queuelist.splice(i, 1);
                        return;
                    }
                    else {
                        if (queuelist[i].pedidoTime === 0) {
                            alert("Oops, não acabaste o pedido a tempo. O cliente saiu insatisfeito.");

                            clearInterval(timer);

                            dinheiroDicionario.DinheiroDia = parseInt(dinheiroDicionario.DinheiroDia) - queuelist[i].Dinheiro;

                            resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

                            let dinheiroProfile = JSON.stringify(resultsdia);

                            localStorage.setItem("Dinheiro", dinheiroProfile);
                            getMoneyLocal();

                            zonaPedidosDiv.removeChild(currentOrder);
                            queuelist.splice(i, 1);
                        }
                    }
                }
            }, 3000)
        })(i);
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
                }, 5000);
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

//Function para buscar um animal
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

function tosquiarAnimal(numId) {
    let promptText = "Quer tosquiar este animal?"

    if (confirm(promptText)) {
        for (let i = 0; i < tosquiaStatus.length; i++) {
            if (numId == tosquiaStatus[i].tosquiaNum) {
                tosquiaStatus[i].IsComplete = true;

                wasteTime(tosquiaStatus[i].TaskTime);
                console.log("Gastou " + tosquiaStatus[i].TaskTime);
                alert("O animal foi tosqueado!");

                break;
            }
        }
        clearListaTosquia();
        MostrarTosquiaList();
    }
}


function lavarAnimal(numId) {
    let promptText = "Quer lavar este animal?"

    if (confirm(promptText)) {
        for (let i = 0; i < banhoStatus.length; i++) {
            if (numId == banhoStatus[i].banhoNum) {
                banhoStatus[i].IsComplete = true;

                wasteTime(banhoStatus[i].TaskTime);

                console.log("Gastou " + banhoStatus[i].TaskTime);
                alert("O animal foi lavado!");

                break;
            }
        }
        clearListaBanhos();
        MostrarBanhosList();
    }
}

function passearAnimal(numId) {
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

                    //Imagem vai para a tabela   
                    let imgPedido = document.createElement("img");
                    imgPedido.setAttribute("src", "./images/" + pedido[i].Imagem + ".png");
                    imgPedido.setAttribute("alt", pedido[i].Imagem);

                    let numContainer = document.createElement("div");
                    numContainer.textContent = a;

                    let tipoContainer = document.createElement("div");
                    tipoContainer.textContent = "Tipo de Pedido: " + pedido[i].TipoPedido + " de " + pedido[i].TipoAnimal;

                    let timeContainer = document.createElement("div");
                    timeContainer.textContent = "Tempo Limite: " + pedido[i].Tempo;

                    let statusContainer = document.createElement("div");
                    statusContainer.textContent = "Status: Pending";

                    let buttonContainer = document.createElement("div");

                    //Cria um buttao, botao tem os parametros do tipo de pedido e tipo de animal
                    let buttonPedido = document.createElement("Button");
                    buttonPedido.setAttribute("onclick", "giveOrder('pedido" + a + "','" + pedido[i].TipoPedido + "','" + pedido[i].TipoAnimal + "')");
                    buttonPedido.textContent = "Terminar Pedido";

                    queuelist.push(
                        {
                            "pedidoNum": a,
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
                                "Dinheiro": 70,
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
                                "Dinheiro": 70,
                                "IsComplete": false,
                            }
                        )
                        clearListaBanhos();
                        MostrarBanhosList();
                    }

                    zonaPedidosDiv.appendChild(pedidoContainer);
                    pedidoContainer.appendChild(imgContainer);
                    pedidoContainer.appendChild(numContainer);
                    pedidoContainer.appendChild(tipoContainer);
                    pedidoContainer.appendChild(timeContainer);
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
}

function clearListaTosquia() {
    let tosquiasdiv = document.getElementById("tosquias_container");
    tosquiasdiv.textContent = "";
}

function clearListaBanhos() {
    let banhosdiv = document.getElementById("banhos_container");
    banhosdiv.textContent = "";
}

function MostrarTosquiaList() {
    let tosquiasdiv = document.getElementById("tosquias_container");

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

            if (tosquiaStatus[i].IsComplete == false) {
                animalStatus.textContent = "Não Tosqueado";
            }
            else {
                animalStatus.textContent = "Tosqueado";
            }

            let animalButton = document.createElement("td");
            let tosquiaButton = document.createElement("button");
            tosquiaButton.setAttribute("onclick", "tosquiarAnimal('" + tosquiaStatus[i].tosquiaNum + "')");
            tosquiaButton.textContent = "Tosquiar Animal";

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
    let banhosdiv = document.getElementById("banhos_container");

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

            if (banhoStatus[i].IsComplete == false) {
                animalStatus.textContent = "Não Lavado";
            }
            else {
                animalStatus.textContent = "Lavado";
            }

            let animalButton = document.createElement("td");
            let banhoButton = document.createElement("button");
            banhoButton.setAttribute("onclick", "lavarAnimal('" + banhoStatus[i].banhoNum + "')");
            banhoButton.textContent = "Lavar Animal";

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
        if (Pedido == "Adotar" || Pedido == "Racao") {
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
        else if (Pedido == "Tosquia") {
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
        else if (Pedido == "Banho") {
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
        else if (Pedido == "Passeio") {
            for (let i = 0; i < passeioStatus.length; i++) {

            }
        }

        console.log("Dinheiro Recebido: " + dinheiroDicionario.DinheiroDia);
        resultsdia.DinheiroDia = dinheiroDicionario.DinheiroDia;

        let dinheiroProfile = JSON.stringify(resultsdia);

        localStorage.setItem("Dinheiro", dinheiroProfile);
        getMoneyLocal();
    }
}