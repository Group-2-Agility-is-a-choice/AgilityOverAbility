function passLoginDeets(){
    let username = "";
    username += document.getElementById("user").innerHTML;
    username += "&user";
    let password = "";
    password += document.getElementById("pass").innerHTML;
    password += "&pass";
    fetch("backend/?loginDetails&user=Adam&pass=notAdam").then((rtn)=>{
        rtn.json().then((data)=>{
         setCookie(data.token);
         window.location.replace = "WHATEVER THE ADMIN SITE IS CALLED";
        })
    });
}


function setCookie(value){
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = "Jeffery =" + value + ";" + expires + ";path=/";
}



