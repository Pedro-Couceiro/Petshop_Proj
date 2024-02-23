function init()
{
    getCurrentTime();
    getUserLocal();
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