let animals = 
[
    {"Animal":"Gato", "Quantidade":1},
    {"Animal":"Cao", "Quantidade":1},
    {"Animal":"Passaro","Quantidade":1},
]

let racao =
[
    {"Tipo": "Gato","Quantidade":1},
    {"Tipo": "Cao","Quantidade":1},
    {"Tipo": "Passaro","Quantidade":1},
]

let pedido
[
    {"Tipo Pedido":"","Imagem":"", "Tempo":""},
]

function init()
{
    console.log("test");

    let profileLocalStorage = localStorage.getItem("UserProfile");
    let profileDicionario = JSON.parse(profileLocalStorage);

    document.getElementById("txt_username").textContent = profileDicionario.name;
}

function pedidoBalcao()
{

}

function giveRacao()
{

}

function giveAnimal()
{

}

function feedAnimal()
{
    
}