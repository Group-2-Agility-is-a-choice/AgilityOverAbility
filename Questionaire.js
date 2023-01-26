// WHICH INGREDIENTS DO YOU HAVE LIST
function listOwnedIngredients(){
    fetch(backend?getIngredients).then((rtn)=>{
        rtn.json().then((data)=>{
            let ownedIngr = "<ul style = 'list-style:none;'>";
            data.foreach((item)=>{
                listOfIngrs += `<lu> <input class = "owned-list" type = "checkbox" value = "${item.IngredientID}" id = ${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
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
            data.foreach((item)=>{
                listOfIngr += `<li> <input class = "avoid-list" type = "checkbox" value = "${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngr += `</ul>`;
            document.getElementById("question-avoid").innerHTML = listOfIngr;
        })
    });
}


// MAKE INTO ONE BIG PASS FUNCTION

function passGoods(){
    let allergIngredients = "";
    let els = document.getElementsByClassName("allerg-list");
    for(let i = 0; i < els.length; i++){
        if (els[i].checked == false){
        // PASS IN NAME????
            allergIngredients += "&ingredientsID[]=" + els[i].id;
        }
    };
}







// // ALLERGENS PASSED TO BACKEND
// function passAllerg(){
//     let allergIngredients = "";
//     let els = document.getElementsByClassName("allerg-list");
//     for(let i = 0; i < els.length; i++){
//         if (els[i].checked == false){
//             // PASS IN NAME????
//             allergIngredients += "&ingredientsID[]=" + els[i].id;
//         }
//     };
// }


// // INGRESDIENTS OWNED TO BACKEND
// function passOwnedIngr(){
//     let ownedIngr = "";
//     let els = document.getElementsByClassName("owned-list");
//     for(let i = 0; i < els.length; i++){
//         if(els[i].checked == true){
//             // PASS IN NAME?????
//             ownedIngr += "&ingredientsID[]" + els[i].id;
//         }
//     };
// }



