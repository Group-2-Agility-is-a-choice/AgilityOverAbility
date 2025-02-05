let ingredients = [];

// Makes check boxes for all the ingredients
function allIngredients(){
    fetch("backend/?getIngredients").then((rtn)=>{
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

// Displays recipes
function displayRecipes(){
    let relevantIngredients = "";

    let els = document.getElementsByClassName("check-ingredients");

    for(let i = 0; i < els.length ; i++){
        if (els[i].checked){
            relevantIngredients += "&ingredientsID[]=" + els[i].id;
        }
    };




    // BACKEND NEEDS IMPLEMENTED SO RELEVANT PARAMETERS CAN BE PASSED IN
    fetch("backend/?searchRecipes"+relevantIngredients).then((rtn)=>{
        rtn.json().then((data)=>{
            let recipeList = "";
            data?.forEach((item)=>{
                recipeList += `<div class=" reviewCard card mb-3 border border-dark" style="max-width: 800px;" ><div class="row no-gutters">
                <div class="col-md-4">
                <img src="${item.Image.replace('recipeBig', 'recipeSmall')}" style="height:100%;width:100%;" class="card-img" alt="...">

                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h4 class="card-title"><a href="recipe.html?id=${item.RecipeID}">${item.Name}</h4></a>
                    <p class="card-text mt-4"><small class="text-muted">Spice: <b class="text-danger">${'🌶'.repeat(item.Spicelevel)}</b><b>${'🌶'.repeat(3 - (item.Spicelevel))}</b></small></p>
                    <p class="card-text mt-4"><small class="text-muted">Rating: <b>${'⭐'.repeat(item.RatingAVG)}</b></small></p>
                    <p class="card-text"><small class="text-muted">Serves: ${item.ServingAmount}</small></p>
                  </div>
                </div>
              </div></div>`;
            });
            document.getElementById("seachRecipes").innerHTML = recipeList;
        })

    });
}
