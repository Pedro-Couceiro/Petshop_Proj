let profile = 
{ 
    name:"user1", 
    password:"password1"
}

function init()
{    
    console.log("init");

    let profileLocalStorage = localStorage.getItem("UserProfile");

    if(profileLocalStorage === null)
    {
        console.log("Novo Jogo");

        let userProfile = JSON.stringify(profile);

        localStorage.setItem("UserProfile", userProfile);
    }
    else 
    {
        let profileDicionario = JSON.parse(profileLocalStorage);

        console.log(profileDicionario.name);
        console.log(profileDicionario.password);

        profile.name = profileDicionario.name;
        profile.password = profileDicionario.password;
    }
}

function login()
{
    let nome = document.getElementById('txt_nome').value;
    let pass = document.getElementById('txt_pass').value;
    let form = document.getElementById('form_login');
   
    if(nome === profile.name && pass === profile.password) 
    {
        console.log("login successful");
        //Redirecionar para outra pagina
        form.action = "home.html";
    }
    else 
    {
        alert("Username ou Password incorreta");
    }
    
}