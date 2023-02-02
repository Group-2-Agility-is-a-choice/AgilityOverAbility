function passLoginDeets(){
    fetch("backend/?AdminLogin",{method:'POST',headers:{'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"},
"body":Object.entries({
    "username":document.getElementById("user").value,
    "password":document.getElementById("pass").value
}).map(([k,v])=>{return k+"="+v}).join('&')}).then((rtn)=>{
        rtn.json().then((data)=>{
         setCookie(data.token);
         window.location.replace("admin.html");
        })
    });
}


function setCookie(value){
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = "Jeffery =" + value + ";" + expires + ";path=/";
}



