let list = [];

function allIngredients(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let ingredientsList = "<ul style='list-style:none;'>";
            data.forEach((item)=>{
                ingredientsList += `<li> <input onclick='displayRecipes()' class="check-ingredients" type = "checkbox" value="${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            ingredientsList += `</ul>`;
            document.getElementById("getIngredients").innerHTML = ingredientsList;
            displayRecipes();
        })
    });
}

load();

function load() {
  if(localStorage.length>1) {
    let ingredientsList = "<div class='form-check m-3' onclick='checkedBox(this)'><input class='form-check-input' type='checkbox' id='ingredient1'><label class='form-check-label' for='ingredient1'>"
    let formList = ingredientsList+"<input type='number' style='width:75px;' value='5' placeholder='5'>";
        let amount = "5";
        let unit = "x";
        let item = "bananas";
    ingredientsList += amount+unit+" "+item;
    formList += unit+" "+item+"</label></div>"
    ingredientsList += "</label></div>";
    document.getElementById("shopping").innerHTML = ingredientsList;
    document.getElementsById("form").innerHTML = formList;
  } else {
    document.getElementsById("shopping").innerHTML = "<p>Your shopping cart is empty.</p>";
    document.getElementsById("form").innerHTML = "<p>Your shopping cart is empty.</p>";
  }
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
