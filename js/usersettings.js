let profile =  
{ 
    name:"user1", 
    password:"password1"
}


function init()
{
    console.log("init");

    let profileLocalStorage = localStorage.getItem("UserProfile");

    let profileDicionario = JSON.parse(profileLocalStorage);

    document.getElementById("txt_nome").value = profileDicionario.name;
    document.getElementById("txt_pass").value = profileDicionario.pass;    
}

function changeUser()
{
    let txt_username = document.getElementById("txt_nome").value;
    let txt_pass = document.getElementById("txt_pass").value;

    profile.name = txt_username;
    profile.password = txt_pass;

    let userProfile = JSON.stringify(profile);

    localStorage.setItem("UserProfile", userProfile);

    alert("Informação atualizada com sucesso!");

    init();
}