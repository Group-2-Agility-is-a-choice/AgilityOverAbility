function passLoginDeets(){
    function showAllRecipes(){let username = "";
            username += document.getElementById("username").innerHTML;
            username += "&username";

            let password = "";
            password += document.getElementById("password").innerHTML;
            password += "&password";
    fetch("backend/?loginDetails&user=Adam&pass=notAdam").then((rtn)=>{
        rtn.json().then((data)=>{
         setCookie(data.token);
         window.location.replace = "WHATEVER THE ADMIN SITE IS CALLED";
        })

    });
}
}

function setCookie(value){
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = "Jeffery =" + value + ";" + expires + ";path=/";
}

function getCookie() {
    let name = "Jeffery =";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        window.location.replace = "WHATEVER THE ADMIN SITE IS CALLED";
      }
    }
    return "";
}


