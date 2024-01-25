let profile =
{
    name: "user1",
    password: "password1"
}


function init() {
    console.log("init");

    getCurrentTime();

    let profileLocalStorage = localStorage.getItem("UserProfile");

    let profileDicionario = JSON.parse(profileLocalStorage);

    document.getElementById("txt_username").textContent = profileDicionario.name;

    document.getElementById("txt_nome").value = profileDicionario.name;
    document.getElementById("txt_pass").value = profileDicionario.pass;
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

    let time = hh + ":" + mm + " " + session;

    document.getElementById("HorasSpan").textContent = time;
    setTimeout(function () { getCurrentTime() }, 1000);
}

function changeUser() {
    let txt_username = document.getElementById("txt_nome").value;
    let txt_pass = document.getElementById("txt_pass").value;

    profile.name = txt_username;
    profile.password = txt_pass;

    let userProfile = JSON.stringify(profile);

    localStorage.setItem("UserProfile", userProfile);

    alert("Informação atualizada com sucesso!");

    init();
}