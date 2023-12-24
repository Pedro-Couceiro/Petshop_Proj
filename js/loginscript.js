let profile =
[
    {
        name:"user1",
        password:"password1"
    }
]

function login(form)
{
    let nome = document.getElementById('txt_nome').value;
    let pass = document.getElementById('txt_pass').value;
   
    for(let i = 0; i < profile.length; i++)
    {
        if(nome == profile[i].name && pass == profile[i].password) 
        {
            console.log("login successful");
            //Redirecionar para outra pagina
            form.action = "home.html";
            return true;
        }
        else 
        {
            alert("Username ou Password incorreta");
            return false;
        }
    }
}