let ingredients = [];

function allIngredients(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let ingredientsList = "<ul>";
            data.getIngredients.foreach((item)=>{
                ingredientsList += `<li> <input class="check-ingredients" type = "checkbox" value="${item.IngredientId}" id = "${item.IngredientId}"> <label for = "${item.IngredientId}"> ${item.Name}</label><br></li>`;
            }); 
            ingredientsList += `</ul>`;  
            document.getElementById("getIngredients").innerHTML = ingredientsList; 
        })
    });
}

function displayRecipes(){
    let relevantIngredients = "";
    document.getElementsByClassName("check-ingredients").foreach((item)=>{
        if (item.checked == false){
            relevantIngredients += "&ingredientsID[]=" + item.id;
        }
    });
    // BACKEND NEEDS IMPLEMENTED SO RELEVANT PARAMETERS CAN BE PASSED IN
    fetch("backend?searchRecipes").then((rtn)=>{
        rtn.json().then((data)=>{
            let recipeList = "<ul>";
            data.seachRecipes.foreach((item)=>{
                recipeList += `<li>${item.Name} ${item.Image} ${item.SpiceLevel} ${item.ServingAmount}</li>`;
            }); 
            recipeList += `</ul>`;  
            document.getElementById("seachRecipes").innerHTML = recipeList; 
        })
    });
}