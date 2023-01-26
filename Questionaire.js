// LIST OF POTENTIAL ALLERGENS WITH CHECKBOXES
function listAllerg(){
    fetch("backend? WHATEVRR NAME IS").then((rtn)=>{
        rtn.json().then((data)=>{
            let listOfIngr = "<ul style = 'list-style:none;'>";
            data.foreach((item)=>{
                listOfIngr += `<li> <input onclick = 'passAllerg()' class = "allerg-list" type = "checkbox" value = "${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngr += `</ul>`;
            document.getElementById("BACKEND NAEM").innerHTML = listOfIngr;
        })
    });
}

// ALLERGENS PASSED TO BACKEND
function passAllerg(){
    let allergIngredients = "";
    let els = document.getElementsByClassName("allerg-list");
    for(let i = 0; i < els.length; i++){
        if (els[i].checked == false){
            // PASS IN NAME????
            allergIngredients += "&ingredientsID[]=" + els[i].id;
        }
    };
}


// HTML FUNCTINO THING NEEDED


// WHICH INGREDIENTS DO YOU HAVE LIST
function listOwnedIngredients(){
    fetch(BACKEND NAME).then((rtn)=>{
        rtn.json().then((data)=>{
            let ownedIngr = "<ul style = 'list-style:none;'>";
            data.foreach((item)=>{
                listOfIngrs += `<lu> <input oneclick = passOwnedIngr()' class = "owned-list" type = "checkbox" value = "${item.IngredientID}" id = ${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngrs += `</ul>`;
            document.getElementById(BACKEND NAME ).innerHTML = listOfIngrs;
        })

    })
}

// INGRESDIENTS OWNED TO BACKEND
function passOwnedIngr(){
    let ownedIngr = "";
    let els = document.getElementsByClassName("owned-list");
    for(let i = 0; i < els.length; i++){
        if(els[i].checked == true){
            // PASS IN NAME?????
            ownedIngr += "&ingredientsID[]" + els[i].id;
        }
    };
}


// HTML FUNCTINO THING NEEDED


// DO YOU LIKE SPICY FOOD CHECK 
function listSpice(){
    '<input type = "range" id = "Spice" label = "Spice" min = "0" max = "3">'
    '<label for = "Spice" >Spice</label>'
    let spiceLevel = document.getElementById("Spice");
    spiceLevel += "name?????";


    


}


