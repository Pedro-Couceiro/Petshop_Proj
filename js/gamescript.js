//Dictionary Variables
let animallist =
    [
        { "Tipo": "Gato", "Quantidade": 0, "Dinheiro": 150, "Check": false },
        { "Tipo": "Cao", "Quantidade": 0, "Dinheiro": 150, "Check": false },
        { "Tipo": "Passaro", "Quantidade": 0, "Dinheiro": 150, "Check": false },
    ]

let racaolist =
    [
        { "Tipo": "Gato", "Quantidade": 0, "Dinheiro": 30, "Check": false },
        { "Tipo": "Cao", "Quantidade": 0, "Dinheiro": 30, "Check": false },
        { "Tipo": "Passaro", "Quantidade": 0, "Dinheiro": 30, "Check": false },
    ]

let pedido =
    [
        { "PedidoID": 1, "TipoPedido": "Racao", "TipoAnimal": "Cao", "Imagem": "RacaoCaoImg", "Tempo": "" },
        { "PedidoID": 2, "TipoPedido": "Racao", "TipoAnimal": "Gato", "Imagem": "RacaoGatoImg", "Tempo": "" },
        { "PedidoID": 3, "TipoPedido": "Racao", "TipoAnimal": "Passaro", "Imagem": "RacaoPassaroImg", "Tempo": "" },
        { "PedidoID": 4, "TipoPedido": "Adotar", "TipoAnimal": "Cao", "Imagem": "DogImg", "Tempo:": "" },
        { "PedidoID": 5, "TipoPedido": "Adotar", "TipoAnimal": "Gato", "Imagem": "CatImg", "Tempo:": "" },
        { "PedidoID": 6, "TipoPedido": "Adotar", "TipoAnimal": "Passaro", "Imagem": "BirdImg", "Tempo:": "" },
    ]

let resultsdia = { "DinheiroDia": "0", "DinheiroTotal": "0" }

let count;

//Functions começam aqui

function init() {
    console.log("test");

    getCurrentTime();

    Timer();

    getUserLocal();

    getMoneyLocal();
}

function getCurrentTime()
{
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + "" + session;
  
    document.getElementById("HorasSpan").textContent = time; 
    let t = setTimeout(function(){ getCurrentTime() }, 1000);
}

function Timer() {
    /*count = 1000;

    const timer = setInterval(
        function () {
            count--;
            document.getElementById("gameTime").textContent = Date.parse(count) + " Min";
            if (count === 0) {
                clearInterval(timer);

                console.log("Time's up!");
            }
        }
    )*/

    /*let t = setTimeout(function () { getTime() }, 1000);*/

    var countDownTime = 600;

    var timer = setInterval(
        function()
        {
            now = new Date().getSeconds();

            var timeDifference = countDownTime - now;

            let minutes = timeDifference.getMinutes();

            document.getElementById("gameTime").textContent = minutes;

            if(timeDifference <= 0)
            {
                clearInterval(timer);

                alert("Time's up! Hora de fechar a loja!");
            }
        }, 1000)
}

function wasteTime() {

}

/*function AnimalHunger()
{
    let count = 60;
    const timer = setInterval(
        function() {
            count--;
      
            console.log(count);
      
            if (count === 0) {
      
                clearInterval(timer);
      
                console.log("Time's up!");
      
            }
        }, 
    1000);
}*/


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

function pedidoBalcao() {
    //Div exclusivamente para por pedidos la no html
    let zonaPedidosDiv = document.getElementById("zona_pedidos");

    //Genera um numero aleatorio entre 1 e 6
    let pedidoNumber = Math.floor(Math.random() * 6) + 1

    for (let i = 0; i < pedido.length; i++) {
        if (pedidoNumber === pedido[i].PedidoID) {
            console.log("O cliente pediu por:" + pedido[i].TipoPedido);

            //Cria um buttao, botao tem os parametros do tipo de pedido e tipo de animal
            let newPedido = document.createElement("Button");
            newPedido.setAttribute("onclick", "giveOrder('" + pedido[i].TipoPedido + "', '" + pedido[i].TipoAnimal + "')");

            //Imagem vai para dentro do buttao
            let imgPedido = document.createElement("img");
            imgPedido.setAttribute("src", "./images/" + pedido[i].Imagem + ".png");
            imgPedido.setAttribute("alt", pedido[i].Imagem);

            zonaPedidosDiv.appendChild(newPedido);
            newPedido.appendChild(imgPedido);

            //Acaba aqui para n fazer asneira
            break;
        }
    }
}

function getRacao(RacaoItem) {
    let i;
    
    for (i = 0; i < racaolist.length; i++) {
        if (RacaoItem === racaolist[i].Tipo) {
            racaolist[i].Quantidade = racaolist[i].Quantidade + 1;
            racaolist[i].Check = true;
            if(RacaoItem==="Cao"){
                document.getElementById("dogfood_quantity").textContent = "Quantidade: " + racaolist[i].Quantidade;
            }else if(RacaoItem === "Gato"){
                document.getElementById("catfood_quantity").textContent = "Quantidade: " + racaolist[i].Quantidade;
            }else if(RacaoItem === "Passaro"){
                document.getElementById("birdfood_quantity").textContent = "Quantidade: " + racaolist[i].Quantidade;
            }

            break;
        }
    }
    console.log("Tens " + racaolist[i].Quantidade + " de racao de " + racaolist[i].Tipo);
}

function getAnimal(Animal) {
    let i;
    
    for (i = 0; i < animallist.length; i++) {
        if (Animal === animallist[i].Tipo) {
            animallist[i].Quantidade = animallist[i].Quantidade + 1;
            animallist[i].Check = true;
            break;
        }
    }
    if(Animal=== "Cao"){
        createDogDiv();
    }
    else if(Animal === "Gato"){
        createCatDiv();
    }else if(Animal=== "Passaro"){
        createBirdDiv();
    }
    console.log("Tens " + animallist[i].Quantidade + " " + animallist[i].Tipo);
}

function createDogDiv() {
    // Create the main div with id "Dog_box"
    var dogBox = document.createElement('div');
    dogBox.id = 'Dog_box';

    // Create the image element
    var dogImage = document.createElement('img');
    dogImage.src = './images/DogImg.png';
    dogImage.id = 'dog_image';

    // Create the inner div with class "w3_border"
    var innerDiv = document.createElement('div');
    innerDiv.className = 'w3_border';

    // Create the button and the div with class "w3-yellow"
    var button = document.createElement('button');
    button.textContent = 'alimentar';
    button.onclick = function() {
      feedAnimal('Cao');
    };

    var yellowDiv = document.createElement('div');
    yellowDiv.className = 'w3-yellow';
    yellowDiv.style.height = '24px';
    yellowDiv.style.width = '20%';

    // Append elements to their respective parent divs
    innerDiv.appendChild(button);
    innerDiv.appendChild(yellowDiv);

    dogBox.appendChild(dogImage);
    dogBox.appendChild(innerDiv);

    // Append the main div to the container div with id "dogs_container"
    document.getElementById('dogs_container').appendChild(dogBox);
  }
  function createCatDiv(){

    var catBox = document.createElement('div');
    catBox.id = 'Cat_box';

    var catImage = document.createElement('img');
    catImage.src = './images/CatImg.png';
    catImage.id = 'cat_image';

    var innerDiv = document.createElement('div');
    innerDiv.className = 'w3_border';

    var button = document.createElement('button');
    button.textContent = 'alimentar';
    button.onclick = function() {
      feedAnimal('Gato');
    };

    var yellowDiv = document.createElement('div');
    yellowDiv.className = 'w3-yellow';
    yellowDiv.style.height = '24px';
    yellowDiv.style.width = '20%';

    innerDiv.appendChild(button);
    innerDiv.appendChild(yellowDiv);

    catBox.appendChild(catImage);
    catBox.appendChild(innerDiv);

    document.getElementById('cats_container').appendChild(catBox);
  }

  function createBirdDiv(){

    var birdBox = document.createElement('div');
    birdBox.id = 'Bird_box';

    var birdImage = document.createElement('img');
    birdImage.src = './images/BirdImg.png';
    birdImage.id = 'bird_image';

    var innerDiv = document.createElement('div');
    innerDiv.className = 'w3_border';

    var button = document.createElement('button');
    button.textContent = 'alimentar';
    button.onclick = function() {
      feedAnimal('Passaro');
    };

    var yellowDiv = document.createElement('div');
    yellowDiv.className = 'w3-yellow';
    yellowDiv.style.height = '24px';
    yellowDiv.style.width = '20%';

    innerDiv.appendChild(button);
    innerDiv.appendChild(yellowDiv);

    birdBox.appendChild(birdImage);
    birdBox.appendChild(innerDiv);

    document.getElementById('birds_container').appendChild(birdBox);
  }

function giveOrder(TipoPedido, Animal) {
    let i;
    let zonaPedidosDiv = document.getElementById("zona_pedidos");
    let currentOrder = zonaPedidosDiv.childNodes;

    let dinheiroLocalStorage = localStorage.getItem("Dinheiro");
    let dinheiroDicionario = JSON.parse(dinheiroLocalStorage);

    let promptText = "De certeza que quer completar este pedido? Carregue OK se sim, carregue CANCEL se não";

    if (confirm(promptText)) {
        //Se o tipo de Pedido e de adocao
        if (TipoPedido === 'Adotar') {
            for (i = 0; i < animallist.length; i++) {
                //Verifica o Animal
                if (Animal === animallist[i].Tipo) {
                    //Verifica se tem o animal
                    if (animallist[i].Check == true) {
                        //Subtrai a quantidade que o jogador tem
                        animallist[i].Quantidade = animallist[i].Quantidade - 1;

                        dinheiroDicionario.DinheiroDia = animallist[i].Dinheiro + parseInt(dinheiroDicionario.DinheiroDia);

                        //Remove o pedido
                        zonaPedidosDiv.removeChild(currentOrder[0]);

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
                        zonaPedidosDiv.removeChild(currentOrder[0]);

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

function feedAnimal(Animal) {

    let promptText = "Pretende começar o processo de alimentação do " + Animal + "? Carregue OK se sim, carregue CANCEL se não";

    if (confirm(promptText)) {
        for (let i = 0; i < racaolist.length; i++) {
            if (Animal === racaolist[i].Tipo) {
                if (racaolist[i].Check == true) {

                    racaolist[i].Quantidade = racaolist[i].Quantidade - 1;
                    console.log("Sucessful feeding");
                    alert(Animal + " alimentado com sucesso!");
                    if (racaolist[i].Quantidade === 0) {
                        racaolist[i].Check = true;
                    }
                    break;
                }
                else
                {
                    alert("Não tem a ração do " + Animal + ".");
                }
            }
        }
    }
}

function AnimalHunger()
{
    let count = 60;
    const timer = setInterval(
        function() {
            count--;
      
            console.log(count);
      
            if (count === 0) {
      
                clearInterval(timer);
      
                console.log("Time's up!");
      
            }
        }, 
    1000);
}

// scripts that use jQuery
$(document).ready(function(){

    // at the start it apears the main menu div
    $("#zona_balcao").hide();
    $("#zona_animals").hide();
    $("#zona_alimentacao").hide();

    $("#animal_zone_button").click(function() {
        
        $("#main_zone").hide();
        $("#zona_animals").show();

    });

    $("#balcao_zone_button").click(function() {
        
        $(this).hide();
        $("#main_zone").hide();
        $("#zona_balcao").show();
        
    });

    $("#alimentation_zone_button").click(function() {
        
        $(this).hide();
        $("#main_zone").hide();
        $("#zona_alimentacao").show();

    });

    $(".voltar_main").click(function() {


        $(this).parent(".animal_zone").hide();

        $("#main_zone").show();

    });

    $(".alimentation_back").click(function() {

        $(this).parent(".alilmentation_zone")
        $("#")

    });

    
});
                
