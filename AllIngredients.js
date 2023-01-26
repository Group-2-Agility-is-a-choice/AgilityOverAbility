let ingredients = [];

function allIngredients(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let ingredientsList = "<ul style='list-style:none;'>"
            data.forEach((item)=>{
                ingredientsList += `<li> <input onclick='displayRecipes()' class="check-ingredients" type = "checkbox" value="${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            }); 
            ingredientsList += `</ul>`;  
            document.getElementById("getIngredients").innerHTML = ingredientsList; 
            displayRecipes();
        })
    });
}

function displayRecipes(){
    let relevantIngredients = "";

    let els = document.getElementsByClassName("check-ingredients");

    for(let i = 0; i < els.length ; i++){
        if (els[i].checked == false){
            relevantIngredients += "&ingredientsID[]=" + els[i].id;
        }
    };




    // BACKEND NEEDS IMPLEMENTED SO RELEVANT PARAMETERS CAN BE PASSED IN
    fetch("backend?searchRecipes").then((rtn)=>{
        rtn.json().then((data)=>{
            let recipeList = "<ul>";
            data?.seachRecipes.forEach((item)=>{
                recipeList += `<li>${item.Name} ${item.Image} ${item.SpiceLevel} ${item.ServingAmount}</li>`;
            }); 
            recipeList += `</ul>`;  
            document.getElementById("seachRecipes").innerHTML = recipeList; 
        })
    });
}
