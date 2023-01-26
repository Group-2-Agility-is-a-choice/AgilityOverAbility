// WHICH INGREDIENTS DO YOU HAVE LIST
function listOwnedIngredients(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let listOfIngrs = "<ul style = 'list-style:none;'>";
            data.forEach((item)=>{
                listOfIngrs += `<li> <input class = "owned-list" type = "checkbox" value = "${item.IngredientID}" id = ${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngrs += `</ul>`;
            document.getElementById("question-have").innerHTML = listOfIngrs;
        })

    })
}


// LIST OF POTENTIAL ALLERGENS WITH CHECKBOXES
function listAvoid(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let listOfIngr = "<ul style = 'list-style:none;'>";
            data.forEach((item)=>{
                listOfIngr += `<li> <input class = "avoid-list" type = "checkbox" value = "${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngr += `</ul>`;
            document.getElementById("question-avoid").innerHTML = listOfIngr;
        })
    });
}


// MAKE INTO ONE BIG PASS FUNCTION

function passGoods(){
    // AVOID INGREDIENTS
    let avoidIngredients = "";
    let els = document.getElementsByClassName("avoid-list");
    for(let i = 0; i < els.length; i++){
        if (els[i].checked == false){
        // PASS IN NAME????
            avoidIngredients += "&avoidIngredients[]=" + els[i].id;
        }
    };

    // OWNED INGREDIENTS
    let ownedIngr = "";
    els = document.getElementsByClassName("owned-list");
    for(let i = 0; i < els.length; i++){
        if(els[i].checked == true){
            ownedIngr += "&ownedIngredients[]" + els[i].id;
        }
    };
}