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
            allergIngredients += "&ingredientsID[]=" + els[i].id;
        }
    };
}




// WHICH INGREDIENTS DO YOU HAVE LIST
function listOwnedIngredients(){
    fetch(BACKEND NAME).then((rtn)=>{
        rtn.json().then((data)=>{
            let ownedIngr = "<ul style = 'list-style:none;'>";
            data.foreach((item)=>{
                listOfIngrs += `<lu> <input oneclick = FUNCNTION' class = "owned-list" type = "checkbox" value = "${item.IngredientID}" id = ${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            })
        })

    })
}







// function allIngredients(){
//     fetch("backend?getIngredients").then((rtn)=>{
//         rtn.json().then((data)=>{
//             let ingredientsList = "<ul style='list-style:none;'>"
//             data.forEach((item)=>{
//                 ingredientsList += `<li> <input onclick='displayRecipes()' class="check-ingredients" type = "checkbox" value="${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
//             }); 
//             ingredientsList += `</ul>`;  
//             document.getElementById("getIngredients").innerHTML = ingredientsList; 
//             displayRecipes();
//         })
//     });
// }









// function displayRecipes(){
//     let relevantIngredients = "";

//     let els = document.getElementsByClassName("check-ingredients");

//     for(let i = 0; i < els.length ; i++){
//         if (els[i].checked == false){
//             relevantIngredients += "&ingredientsID[]=" + els[i].id;
//         }
//     };